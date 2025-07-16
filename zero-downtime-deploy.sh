#!/bin/bash

# Zero-Downtime Deployment Script
# Güncelleme sırasında sistem çalışmaya devam eder
# Veriler korunur, kullanıcılar etkilenmez

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.production.yml"
BACKUP_DIR="/var/lib/mes/backup"
LOG_FILE="/var/log/mes-deployment.log"

# Logging function
log() {
    local message="[$(date '+%Y-%m-%d %H:%M:%S')] $1"
    echo -e "$message" | tee -a "$LOG_FILE"
}

# Error handling
error_exit() {
    log "${RED}ERROR: $1${NC}"
    exit 1
}

# Success message
success() {
    log "${GREEN}✅ $1${NC}"
}

# Warning message
warning() {
    log "${YELLOW}⚠️  $1${NC}"
}

# Info message
info() {
    log "${BLUE}ℹ️  $1${NC}"
}

# Check if running as root (required for DigitalOcean)
if [[ $EUID -ne 0 ]]; then
   error_exit "This script must be run as root"
fi

# Check if docker-compose file exists
if [[ ! -f "$COMPOSE_FILE" ]]; then
    error_exit "Docker compose file not found: $COMPOSE_FILE"
fi

# Create necessary directories
mkdir -p "$BACKUP_DIR" /var/log /var/lib/mes/{database,redis}

info "🚀 Starting Zero-Downtime Deployment..."

# 1. Pre-deployment checks
info "1/8 Pre-deployment checks..."

# Check disk space
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [[ $DISK_USAGE -gt 85 ]]; then
    warning "Disk usage is high: ${DISK_USAGE}%"
fi

# Check memory
FREE_MEM=$(free -m | awk 'NR==2{printf "%.1f", $7/$2*100}')
info "Available memory: ${FREE_MEM}%"

# 2. Database backup
info "2/8 Creating database backup..."
if docker exec mes-database /usr/local/bin/backup.sh; then
    success "Database backup completed"
else
    error_exit "Database backup failed"
fi

# 3. Pull latest changes
info "3/8 Pulling latest changes from repository..."
if git pull origin main; then
    success "Repository updated"
else
    error_exit "Failed to pull latest changes"
fi

# 4. Build new images
info "4/8 Building new Docker images..."
if docker-compose -f "$COMPOSE_FILE" build --no-cache; then
    success "Images built successfully"
else
    error_exit "Image build failed"
fi

# 5. Rolling update - Backend
info "5/8 Rolling update for backend services..."

# Start new backend instance
info "Starting new backend instance..."
if docker-compose -f "$COMPOSE_FILE" up -d --scale mes-backend=2 --no-recreate mes-backend; then
    success "New backend instance started"
else
    error_exit "Failed to start new backend instance"
fi

# Wait for health check
info "Waiting for backend health check..."
sleep 30

# Check if new instance is healthy
if docker-compose -f "$COMPOSE_FILE" ps mes-backend | grep -q "healthy"; then
    success "Backend health check passed"
else
    error_exit "Backend health check failed"
fi

# Stop old backend instance
info "Stopping old backend instance..."
OLD_BACKEND=$(docker ps -q --filter "name=mes-backend" | head -1)
if [[ -n "$OLD_BACKEND" ]]; then
    docker stop "$OLD_BACKEND" || warning "Failed to stop old backend"
    docker rm "$OLD_BACKEND" || warning "Failed to remove old backend"
fi

# 6. Rolling update - Frontend
info "6/8 Rolling update for frontend services..."

# Start new frontend instance
info "Starting new frontend instance..."
if docker-compose -f "$COMPOSE_FILE" up -d --scale mes-frontend=2 --no-recreate mes-frontend; then
    success "New frontend instance started"
else
    error_exit "Failed to start new frontend instance"
fi

# Wait for health check
info "Waiting for frontend health check..."
sleep 20

# Check if new instance is healthy
if docker-compose -f "$COMPOSE_FILE" ps mes-frontend | grep -q "healthy"; then
    success "Frontend health check passed"
else
    error_exit "Frontend health check failed"
fi

# Stop old frontend instance
info "Stopping old frontend instance..."
OLD_FRONTEND=$(docker ps -q --filter "name=mes-frontend" | head -1)
if [[ -n "$OLD_FRONTEND" ]]; then
    docker stop "$OLD_FRONTEND" || warning "Failed to stop old frontend"
    docker rm "$OLD_FRONTEND" || warning "Failed to remove old frontend"
fi

# 7. Update load balancer and other services
info "7/8 Updating load balancer and other services..."
if docker-compose -f "$COMPOSE_FILE" up -d mes-loadbalancer mes-redis mes-webhook; then
    success "Support services updated"
else
    error_exit "Failed to update support services"
fi

# 8. Final health checks
info "8/8 Final health checks..."

# Wait for all services to be ready
sleep 30

# Check database
if docker exec mes-database pg_isready -U mes_user -d mes_production; then
    success "Database is ready"
else
    error_exit "Database health check failed"
fi

# Check backend
if curl -f http://localhost:3001/api/working-hours >/dev/null 2>&1; then
    success "Backend is ready"
else
    error_exit "Backend health check failed"
fi

# Check frontend
if curl -f http://localhost/ >/dev/null 2>&1; then
    success "Frontend is ready"
else
    error_exit "Frontend health check failed"
fi

# Check Redis
if docker exec mes-redis redis-cli ping | grep -q "PONG"; then
    success "Redis is ready"
else
    warning "Redis health check failed (non-critical)"
fi

# Clean up old images
info "Cleaning up old Docker images..."
docker image prune -f >/dev/null 2>&1 || warning "Failed to clean up images"

# Show final status
echo ""
info "=== DEPLOYMENT COMPLETED SUCCESSFULLY ==="
info "🎉 Zero-downtime deployment completed!"
info "📊 System Status:"
docker-compose -f "$COMPOSE_FILE" ps

# Show resource usage
echo ""
info "📈 Resource Usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" \
    $(docker ps --format "{{.Names}}" | grep "mes-")

success "Deployment finished! System is ready for users."
echo ""
info "🌐 Site URL: https://$(curl -s ipinfo.io/ip 2>/dev/null || echo 'your-server-ip')"
info "📝 Logs: tail -f $LOG_FILE"

# Send notification (if webhook configured)
if [[ -n "$WEBHOOK_URL" ]]; then
    curl -X POST "$WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"text\":\"✅ MES System deployment completed successfully!\"}" \
        >/dev/null 2>&1 || true
fi
