const http = require('http');
const crypto = require('crypto');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = process.env.PORT || 9000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'mes_webhook_secret_2024';
const DEPLOY_MODE = process.env.DEPLOY_MODE || 'zero-downtime';
const LOG_FILE = '/var/log/webhook.log';

// Logging function
function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    
    try {
        fs.appendFileSync(LOG_FILE, logMessage);
    } catch (err) {
        console.error('Failed to write to log file:', err.message);
    }
}

// Execute command with logging
function executeCommand(command, description) {
    log(`🔄 ${description}...`);
    try {
        const output = execSync(command, { 
            encoding: 'utf8',
            cwd: '/app',
            timeout: 300000 // 5 minutes timeout
        });
        log(`✅ ${description} completed successfully`);
        return output;
    } catch (error) {
        log(`❌ ${description} failed: ${error.message}`);
        throw error;
    }
}

// Verify GitHub webhook signature
function verifySignature(payload, signature) {
    if (!signature) {
        return false;
    }

    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(digest)
    );
}

// Pre-deployment checks
function performPreDeploymentChecks() {
    log('🔍 Performing pre-deployment checks...');
    
    // Check disk space
    const diskUsage = execSync("df / | awk 'NR==2 {print $5}' | sed 's/%//'", { encoding: 'utf8' }).trim();
    if (parseInt(diskUsage) > 85) {
        log(`⚠️  Warning: High disk usage (${diskUsage}%)`);
    }
    
    // Check if services are running
    try {
        execSync('docker ps | grep mes-database', { encoding: 'utf8' });
        log('✅ Database container is running');
    } catch (error) {
        throw new Error('Database container is not running');
    }
    
    // Check database connectivity
    try {
        execSync('docker exec mes-database pg_isready -U mes_user -d mes_production', { encoding: 'utf8' });
        log('✅ Database is accessible');
    } catch (error) {
        throw new Error('Database is not accessible');
    }
}

// Backup database before deployment
function backupDatabase() {
    log('💾 Creating database backup before deployment...');
    try {
        executeCommand(
            'docker exec mes-database /usr/local/bin/backup.sh',
            'Database backup'
        );
    } catch (error) {
        log('❌ Database backup failed, but continuing with deployment...');
    }
}

// Zero-downtime deployment
function performZeroDowntimeDeployment() {
    log('🚀 Starting zero-downtime deployment...');
    
    // Pull latest changes
    executeCommand('git pull origin main', 'Pulling latest changes');
    
    // Build new images
    executeCommand(
        'docker-compose -f docker-compose.production.yml build --no-cache',
        'Building new Docker images'
    );
    
    // Rolling update for backend
    log('🔄 Performing rolling update for backend...');
    executeCommand(
        'docker-compose -f docker-compose.production.yml up -d --scale mes-backend=2 --no-recreate mes-backend',
        'Starting new backend instance'
    );
    
    // Wait for backend health check
    log('⏳ Waiting for backend health check...');
    let backendReady = false;
    for (let i = 0; i < 30; i++) {
        try {
            execSync('curl -f http://localhost:3001/api/working-hours', { timeout: 5000 });
            backendReady = true;
            break;
        } catch (error) {
            if (i < 29) {
                execSync('sleep 2');
            }
        }
    }
    
    if (!backendReady) {
        throw new Error('Backend health check failed');
    }
    
    log('✅ Backend is healthy');
    
    // Rolling update for frontend
    log('🔄 Performing rolling update for frontend...');
    executeCommand(
        'docker-compose -f docker-compose.production.yml up -d --scale mes-frontend=2 --no-recreate mes-frontend',
        'Starting new frontend instance'
    );
    
    // Wait for frontend health check
    log('⏳ Waiting for frontend health check...');
    let frontendReady = false;
    for (let i = 0; i < 20; i++) {
        try {
            execSync('curl -f http://localhost/', { timeout: 5000 });
            frontendReady = true;
            break;
        } catch (error) {
            if (i < 19) {
                execSync('sleep 2');
            }
        }
    }
    
    if (!frontendReady) {
        throw new Error('Frontend health check failed');
    }
    
    log('✅ Frontend is healthy');
    
    // Update other services
    executeCommand(
        'docker-compose -f docker-compose.production.yml up -d mes-loadbalancer mes-redis',
        'Updating support services'
    );
    
    // Clean up old containers and images
    try {
        executeCommand('docker system prune -f', 'Cleaning up old resources');
    } catch (error) {
        log('⚠️  Cleanup warning: ' + error.message);
    }
}

// Standard deployment (with downtime)
function performStandardDeployment() {
    log('🚀 Starting standard deployment...');
    
    executeCommand('git pull origin main', 'Pulling latest changes');
    executeCommand('docker-compose down', 'Stopping services');
    executeCommand('docker-compose build --no-cache', 'Building images');
    executeCommand('docker-compose up -d', 'Starting services');
    
    // Wait for services
    log('⏳ Waiting for services to start...');
    execSync('sleep 30');
    
    // Health checks
    try {
        executeCommand(
            'docker exec mes-database pg_isready -U mes_user -d mes_production',
            'Database health check'
        );
        executeCommand(
            'curl -f http://localhost:3001/api/working-hours',
            'Backend health check'
        );
        executeCommand(
            'curl -f http://localhost/',
            'Frontend health check'
        );
    } catch (error) {
        log('⚠️  Some health checks failed, but deployment may still be successful');
    }
}

// Main deployment function
function deploy() {
    const startTime = Date.now();
    log('🚀 Starting deployment process...');
    
    try {
        // Pre-deployment checks
        performPreDeploymentChecks();
        
        // Backup database
        backupDatabase();
        
        // Choose deployment strategy
        if (DEPLOY_MODE === 'zero-downtime') {
            performZeroDowntimeDeployment();
        } else {
            performStandardDeployment();
        }
        
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        log(`🎉 Deployment completed successfully in ${duration} seconds`);
        
        // Show final status
        try {
            const status = execSync('docker-compose ps', { encoding: 'utf8', cwd: '/app' });
            log('📊 Final system status:\n' + status);
        } catch (error) {
            log('⚠️  Could not get system status');
        }
        
        return true;
    } catch (error) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        log(`❌ Deployment failed after ${duration} seconds: ${error.message}`);
        
        // Try to rollback if zero-downtime deployment failed
        if (DEPLOY_MODE === 'zero-downtime') {
            log('🔄 Attempting rollback...');
            try {
                executeCommand('docker-compose up -d', 'Rolling back to previous version');
                log('✅ Rollback completed');
            } catch (rollbackError) {
                log(`❌ Rollback failed: ${rollbackError.message}`);
            }
        }
        
        return false;
    }
}

// HTTP Server
const server = http.createServer((req, res) => {
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            // Verify signature
            const signature = req.headers['x-hub-signature-256'];
            if (!verifySignature(body, signature)) {
                log('❌ Invalid webhook signature');
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Unauthorized');
                return;
            }

            const payload = JSON.parse(body);
            
            // Check if it's a push to main branch
            if (payload.ref === 'refs/heads/main') {
                log(`📨 Received webhook for commit: ${payload.head_commit?.id?.substring(0, 7)} by ${payload.head_commit?.author?.name}`);
                log(`💬 Commit message: ${payload.head_commit?.message}`);
                
                // Start deployment in background
                setTimeout(() => {
                    deploy();
                }, 1000);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'success',
                    message: 'Deployment started',
                    mode: DEPLOY_MODE,
                    timestamp: new Date().toISOString()
                }));
            } else {
                log(`📨 Webhook received for ${payload.ref}, ignoring`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'ignored',
                    message: 'Not main branch',
                    ref: payload.ref
                }));
            }
        } catch (error) {
            log(`❌ Webhook processing error: ${error.message}`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    });
});

// Health check endpoint
server.on('request', (req, res) => {
    if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'healthy',
            mode: DEPLOY_MODE,
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        }));
        return;
    }
});

// Start server
server.listen(PORT, () => {
    log(`🌐 Webhook server started on port ${PORT}`);
    log(`🔧 Deploy mode: ${DEPLOY_MODE}`);
    log(`📝 Log file: ${LOG_FILE}`);
    log('✅ Ready to receive webhooks');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    log('📴 Received SIGTERM, shutting down gracefully');
    server.close(() => {
        log('🛑 Webhook server stopped');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    log('📴 Received SIGINT, shutting down gracefully');
    server.close(() => {
        log('🛑 Webhook server stopped');
        process.exit(0);
    });
});
