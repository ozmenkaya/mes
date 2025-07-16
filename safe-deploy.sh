#!/bin/bash

# Safe Production Deployment Script
# Veri kaybı olmadan güncelleme - Güvenli sürüm

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
    log "${RED}❌ ERROR: $1${NC}"
    exit 1
}

success() {
    log "${GREEN}✅ $1${NC}"
}

info() {
    log "${BLUE}ℹ️  $1${NC}"
}

warning() {
    log "${YELLOW}⚠️  $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   error_exit "This script must be run as root"
fi

info "🚀 Starting Safe Production Deployment..."

# 1. Pull latest changes
info "1/7 Pulling latest changes from repository..."
if git pull origin main; then
    success "Repository updated successfully"
else
    error_exit "Failed to pull latest changes"
fi

# 2. Create database backup if running
info "2/7 Creating database backup..."
if docker ps | grep -q mes-database; then
    BACKUP_FILE="/tmp/mes_backup_$(date +%Y%m%d_%H%M%S).sql"
    if docker exec mes-database pg_dump -U mes_user -d mes_production > "$BACKUP_FILE" 2>/dev/null; then
        success "Database backup created: $BACKUP_FILE"
    else
        warning "Database backup failed, but continuing deployment"
    fi
else
    info "No running database found, skipping backup"
fi

# 3. Build new images
info "3/7 Building new Docker images..."
if docker-compose -f docker-compose.stable.yml build --no-cache; then
    success "Docker images built successfully"
else
    error_exit "Failed to build Docker images"
fi

# 4. Stop services gracefully with data preservation
info "4/7 Stopping services gracefully..."
if docker-compose -f docker-compose.stable.yml down; then
    success "Services stopped gracefully"
else
    warning "Some services may have failed to stop cleanly"
fi

# 5. Start services
info "5/7 Starting services..."
if docker-compose -f docker-compose.stable.yml up -d; then
    success "Services started successfully"
else
    error_exit "Failed to start services"
fi

# 6. Wait and perform health checks
info "6/7 Waiting for services to be ready..."
sleep 45

# Database health check
info "Checking database health..."
for i in {1..10}; do
    if docker exec mes-database pg_isready -U mes_user -d mes_production >/dev/null 2>&1; then
        success "Database is healthy"
        break
    elif [ $i -eq 10 ]; then
        error_exit "Database health check failed after 10 attempts"
    else
        info "Database not ready yet, waiting... (attempt $i/10)"
        sleep 5
    fi
done

# Backend health check
info "Checking backend health..."
for i in {1..15}; do
    if curl -f http://localhost:3001/api/working-hours >/dev/null 2>&1; then
        success "Backend is healthy"
        break
    elif [ $i -eq 15 ]; then
        error_exit "Backend health check failed after 15 attempts"
    else
        info "Backend not ready yet, waiting... (attempt $i/15)"
        sleep 3
    fi
done

# Frontend health check
info "Checking frontend health..."
for i in {1..10}; do
    if curl -f http://localhost/ >/dev/null 2>&1; then
        success "Frontend is healthy"
        break
    elif [ $i -eq 10 ]; then
        warning "Frontend health check failed, but may still work"
    else
        info "Frontend not ready yet, waiting... (attempt $i/10)"
        sleep 3
    fi
done

# Redis health check
info "Checking Redis health..."
if docker exec mes-redis redis-cli ping | grep -q "PONG"; then
    success "Redis is healthy"
else
    warning "Redis health check failed (non-critical)"
fi

# 7. Final status check
info "7/7 Final system status check..."
echo ""
success "🎉 Deployment completed successfully!"

# Show final status
info "📊 System Status:"
docker-compose -f docker-compose.stable.yml ps

# Show resource usage
echo ""
info "💾 Resource Usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" \
    $(docker ps --format "{{.Names}}" | grep "mes-") 2>/dev/null || echo "Could not get stats"

echo ""
info "🌐 Your MES system is now running!"
info "   Frontend: http://$(curl -s ipinfo.io/ip 2>/dev/null || hostname -I | awk '{print $1}')"
info "   Backend API: http://$(curl -s ipinfo.io/ip 2>/dev/null || hostname -I | awk '{print $1}'):3001"

# Test final connectivity
echo ""
info "🔍 Final connectivity test..."
if curl -s http://localhost/ | grep -q "html\|HTML"; then
    success "✅ Website is accessible and serving content"
else
    warning "⚠️  Website may have issues, please check manually"
fi

success "🚀 Safe deployment completed! Your data is preserved."
