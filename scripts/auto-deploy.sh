#!/bin/bash

# GitHub Webhook Auto-Deploy Handler
# Bu script GitHub webhook'larını dinler ve otomatik deployment yapar

set -e

# Configuration
REPO_URL="https://github.com/ozmenkaya/mes.git"
DEPLOY_DIR="/root/mes"
WEBHOOK_SECRET="mes_deploy_secret_2024"
LOG_FILE="/var/log/mes-deploy.log"
BACKUP_DIR="/root/mes-backups"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging function
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a $LOG_FILE
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a $LOG_FILE
}

# Create backup before deployment
create_backup() {
    log "🗄️ Database backup oluşturuluyor..."
    
    mkdir -p $BACKUP_DIR
    BACKUP_FILE="$BACKUP_DIR/pre-deploy-$(date +%Y%m%d_%H%M%S).sql"
    
    if docker exec mes-database pg_dump -U mes_user -d mes_production > $BACKUP_FILE 2>/dev/null; then
        gzip $BACKUP_FILE
        log "✅ Backup oluşturuldu: $BACKUP_FILE.gz"
        
        # Keep only last 10 backups
        find $BACKUP_DIR -name "*.gz" -type f | sort -r | tail -n +11 | xargs rm -f 2>/dev/null || true
    else
        log_warning "⚠️ Database backup başarısız (database henüz hazır olmayabilir)"
    fi
}

# Deploy function
deploy() {
    log "🚀 Auto-deployment başlatılıyor..."
    
    # Change to deploy directory
    cd $DEPLOY_DIR
    
    # Create backup
    create_backup
    
    # Pull latest changes
    log "📥 Repository güncelleniyor..."
    git pull origin main
    
    # Build and restart services
    log "🐳 Docker servisleri yeniden başlatılıyor..."
    docker-compose down
    docker-compose up -d --build
    
    # Wait for services to be ready
    log "⏳ Servisler hazır olması bekleniyor..."
    sleep 30
    
    # Health check
    if docker-compose ps | grep -q "Up"; then
        log "✅ Deployment başarılı!"
        
        # Send notification (optional)
        log "📊 Servis durumu:"
        docker-compose ps | tee -a $LOG_FILE
        
        return 0
    else
        log_error "❌ Deployment başarısız!"
        docker-compose logs | tail -50 | tee -a $LOG_FILE
        return 1
    fi
}

# Webhook verification function
verify_webhook() {
    local payload="$1"
    local signature="$2"
    
    if [ -z "$signature" ]; then
        return 1
    fi
    
    # Simple signature verification (production'da daha güvenli olmalı)
    expected="sha256=$(echo -n "$payload" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" | cut -d' ' -f2)"
    
    if [ "$signature" = "$expected" ]; then
        return 0
    else
        return 1
    fi
}

# Main execution
case "$1" in
    "deploy")
        deploy
        ;;
    "webhook")
        # This would be called by the webhook endpoint
        log "📡 Webhook tetiklendi"
        deploy
        ;;
    "manual")
        log "🔧 Manuel deployment tetiklendi"
        deploy
        ;;
    *)
        echo "MES Auto-Deploy Script"
        echo "Kullanım:"
        echo "  $0 deploy    - Deployment çalıştır"
        echo "  $0 webhook   - Webhook handler"
        echo "  $0 manual    - Manuel deployment"
        exit 1
        ;;
esac
