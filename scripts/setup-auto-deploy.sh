#!/bin/bash

# MES Auto-Deploy Setup Script
# Bu script otomatik deployment sistemini kurar

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "Bu script root kullanıcısı ile çalıştırılmalıdır!"
   exit 1
fi

print_info "🔧 MES Auto-Deploy sistemi kuruluyor..."

# Make scripts executable
chmod +x /root/mes/scripts/auto-deploy.sh
chmod +x /root/mes/scripts/webhook-server.cjs

# Copy systemd service file
print_info "📦 Systemd service kuruluyor..."
cp /root/mes/scripts/mes-webhook.service /etc/systemd/system/
systemctl daemon-reload

# Enable and start webhook service
print_info "🚀 Webhook service başlatılıyor..."
systemctl enable mes-webhook
systemctl start mes-webhook

# Configure firewall
print_info "🛡️ Firewall kuralları ekleniyor..."
ufw allow 9000/tcp comment "MES Webhook Server"

# Create log directory
mkdir -p /var/log
touch /var/log/mes-deploy.log
chown root:root /var/log/mes-deploy.log
chmod 644 /var/log/mes-deploy.log

# Test webhook server
print_info "🧪 Webhook server test ediliyor..."
sleep 5

if curl -s http://localhost:9000/health > /dev/null; then
    print_info "✅ Webhook server çalışıyor!"
else
    print_error "❌ Webhook server çalışmıyor!"
    systemctl status mes-webhook
    exit 1
fi

# Get server IP
SERVER_IP=$(curl -s ifconfig.me)

print_info "🎉 Auto-Deploy sistemi kuruldu!"
echo ""
echo "📡 Webhook URL: http://$SERVER_IP:9000/webhook"
echo "💚 Health Check: http://$SERVER_IP:9000/health"
echo ""
echo "🔧 GitHub Webhook Ayarları:"
echo "1. GitHub repository'nize gidin"
echo "2. Settings > Webhooks > Add webhook"
echo "3. Payload URL: http://$SERVER_IP:9000/webhook"
echo "4. Content type: application/json"
echo "5. Secret: mes_deploy_secret_2024"
echo "6. Events: Just the push event"
echo "7. Active: ✓"
echo ""
echo "📊 Sistem Yönetimi:"
echo "  Service durumu: systemctl status mes-webhook"
echo "  Service restart: systemctl restart mes-webhook"
echo "  Logları görüntüle: journalctl -u mes-webhook -f"
echo "  Deploy logları: tail -f /var/log/mes-deploy.log"
echo "  Manuel deploy: /root/mes/scripts/auto-deploy.sh manual"
