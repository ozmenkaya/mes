#!/bin/bash

# MES DigitalOcean Deployment Script (Root User)
# Bu script DigitalOcean droplet'inde root kullanıcısı ile çalışır

set -e

echo "🚀 MES Application Deployment Started (Root Mode)..."

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
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
   echo "Kullanım: sudo ./deploy-root.sh"
   exit 1
fi

# Create deployment user
DEPLOY_USER="mesuser"
if ! id "$DEPLOY_USER" &>/dev/null; then
    print_status "Deployment kullanıcısı oluşturuluyor..."
    useradd -m -s /bin/bash $DEPLOY_USER
    usermod -aG sudo $DEPLOY_USER
    
    # Set up SSH for the new user (copy root's authorized_keys)
    mkdir -p /home/$DEPLOY_USER/.ssh
    cp /root/.ssh/authorized_keys /home/$DEPLOY_USER/.ssh/ 2>/dev/null || true
    chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh
    chmod 700 /home/$DEPLOY_USER/.ssh
    chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys
fi

# Update system
print_status "Sistem güncelleniyor..."
apt update && apt upgrade -y

# Install essential packages
print_status "Gerekli paketler kuruluyor..."
apt install -y curl wget git ufw fail2ban unattended-upgrades

# Install Docker
if ! command -v docker &> /dev/null; then
    print_status "Docker kuruluyor..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $DEPLOY_USER
    rm get-docker.sh
else
    print_status "Docker zaten kurulu."
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_status "Docker Compose kuruluyor..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
else
    print_status "Docker Compose zaten kurulu."
fi

# Configure firewall
print_status "Firewall yapılandırılıyor..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Create application directory
APP_DIR="/home/$DEPLOY_USER/mes"
print_status "Uygulama dizini oluşturuluyor: $APP_DIR"
mkdir -p $APP_DIR
chown $DEPLOY_USER:$DEPLOY_USER $APP_DIR

# Clone repository as deployment user
print_status "Repository klonlanıyor..."
sudo -u $DEPLOY_USER git clone https://github.com/ozmenkaya/mes.git $APP_DIR

# Build and start services as deployment user
print_status "Docker servisleri başlatılıyor..."
cd $APP_DIR
sudo -u $DEPLOY_USER docker-compose up -d --build

# Wait for services to be ready
print_status "Servisler kontrol ediliyor..."
sleep 30

# Check if services are running
if sudo -u $DEPLOY_USER docker-compose ps | grep -q "Up"; then
    print_status "✅ Deployment başarılı!"
    echo ""
    echo "🌐 Uygulamanız şu adreste çalışıyor:"
    echo "   http://$(curl -s ifconfig.me)"
    echo ""
    echo "📊 Servis durumu:"
    sudo -u $DEPLOY_USER docker-compose ps
    echo ""
    echo "📝 Kullanışlı komutlar:"
    echo "   Logları görüntüle: sudo -u $DEPLOY_USER docker-compose logs -f"
    echo "   Servisleri yeniden başlat: sudo -u $DEPLOY_USER docker-compose restart"
    echo "   Servisleri durdur: sudo -u $DEPLOY_USER docker-compose down"
    echo ""
    echo "👤 Deployment kullanıcısı: $DEPLOY_USER"
    echo "   SSH ile bağlan: ssh $DEPLOY_USER@$(curl -s ifconfig.me)"
else
    print_error "❌ Deployment başarısız! Logları kontrol edin:"
    sudo -u $DEPLOY_USER docker-compose logs
    exit 1
fi

print_status "🎉 MES Application deployment tamamlandı!"
