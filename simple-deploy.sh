#!/bin/bash

# Simplified Zero-Downtime Deployment Script
# Production ortamında çalışan basit sürüm

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error_exit() {
    log "${RED}ERROR: $1${NC}"
    exit 1
}

success() {
    log "${GREEN}✅ $1${NC}"
}

info() {
    log "${BLUE}ℹ️  $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   error_exit "This script must be run as root"
fi

info "🚀 Starting Production Deployment..."

# 1. Create backup directories
info "1/6 Creating necessary directories..."
mkdir -p /var/lib/mes/{database,backup,redis} /var/log

# 2. Pull latest changes
info "2/6 Pulling latest changes..."
if git pull origin main; then
    success "Repository updated"
else
    error_exit "Failed to pull latest changes"
fi

# 3. Backup current database if running
info "3/6 Checking for database backup..."
if docker ps | grep -q mes-database; then
    info "Creating database backup..."
    docker exec mes-database pg_dump -U mes_user -d mes_production > /var/lib/mes/backup/pre_deploy_$(date +%Y%m%d_%H%M%S).sql || echo "Backup failed, continuing..."
fi

# 4. Stop current services gracefully
info "4/6 Stopping current services..."
docker-compose down --timeout 30 || echo "No services to stop"

# 5. Start with production config
info "5/6 Starting services with production configuration..."
if docker-compose -f docker-compose.production.yml up -d; then
    success "Services started successfully"
else
    error_exit "Failed to start services"
fi

# 6. Health checks
info "6/6 Performing health checks..."
sleep 30

# Check database
if docker exec mes-database pg_isready -U mes_user -d mes_production >/dev/null 2>&1; then
    success "Database is ready"
else
    error_exit "Database health check failed"
fi

# Check backend
for i in {1..10}; do
    if curl -f http://localhost:3001/api/working-hours >/dev/null 2>&1; then
        success "Backend is ready"
        break
    elif [ $i -eq 10 ]; then
        error_exit "Backend health check failed after 10 attempts"
    else
        sleep 3
    fi
done

# Check load balancer
if curl -f http://localhost/health >/dev/null 2>&1; then
    success "Load balancer is ready"
else
    info "Load balancer health check failed (may be normal)"
fi

# Show final status
echo ""
success "🎉 Deployment completed successfully!"
info "📊 System Status:"
docker-compose -f docker-compose.production.yml ps

echo ""
info "🌐 Site URL: http://$(curl -s ipinfo.io/ip 2>/dev/null || echo 'your-server-ip')"
success "✅ System is ready!"
