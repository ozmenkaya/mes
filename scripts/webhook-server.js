#!/usr/bin/env node

// GitHub Webhook Server for Auto-Deployment
// Bu server GitHub webhook'larını dinler ve deployment tetikler

const http = require('http');
const crypto = require('crypto');
const { execSync } = require('child_process');

const PORT = 9000;
const WEBHOOK_SECRET = 'mes_deploy_secret_2024';
const DEPLOY_SCRIPT = '/root/mes/scripts/auto-deploy.sh';

// Webhook signature verification
function verifySignature(payload, signature) {
    if (!signature) return false;
    
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    hmac.update(payload);
    const expected = 'sha256=' + hmac.digest('hex');
    
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expected)
    );
}

// Log function
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

// Webhook handler
const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Hub-Signature-256');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }
    
    if (req.url !== '/webhook') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }
    
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        try {
            const signature = req.headers['x-hub-signature-256'];
            
            // Verify webhook signature
            if (!verifySignature(body, signature)) {
                log('❌ Webhook signature verification failed');
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            
            const payload = JSON.parse(body);
            
            // Check if it's a push event to main branch
            if (payload.ref === 'refs/heads/main' && payload.pusher) {
                log(`🚀 GitHub push detected from ${payload.pusher.name}`);
                log(`📝 Commits: ${payload.commits.length}`);
                
                // Trigger deployment asynchronously
                setTimeout(() => {
                    try {
                        log('🔄 Starting auto-deployment...');
                        const output = execSync(`chmod +x ${DEPLOY_SCRIPT} && ${DEPLOY_SCRIPT} webhook`, {
                            encoding: 'utf8',
                            timeout: 300000 // 5 minutes timeout
                        });
                        log('✅ Auto-deployment completed successfully');
                        log(output);
                    } catch (error) {
                        log('❌ Auto-deployment failed:');
                        log(error.message);
                    }
                }, 1000);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    status: 'success', 
                    message: 'Deployment triggered',
                    commits: payload.commits.length
                }));
            } else {
                log(`ℹ️ Webhook received but not for main branch: ${payload.ref}`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    status: 'ignored', 
                    message: 'Not a main branch push' 
                }));
            }
            
        } catch (error) {
            log('❌ Error processing webhook:');
            log(error.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    });
});

// Health check endpoint
server.on('request', (req, res) => {
    if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'healthy', 
            timestamp: new Date().toISOString(),
            service: 'mes-webhook-server'
        }));
    }
});

server.listen(PORT, '0.0.0.0', () => {
    log(`🎣 MES Webhook Server listening on port ${PORT}`);
    log(`📡 Webhook URL: http://YOUR_SERVER_IP:${PORT}/webhook`);
    log(`💚 Health check: http://YOUR_SERVER_IP:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    log('🛑 Webhook server shutting down...');
    server.close(() => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    log('🛑 Webhook server shutting down...');
    server.close(() => {
        process.exit(0);
    });
});
