#!/bin/bash

# MES DigitalOcean Deployment Script
# Bu script uygulamanızı DigitalOcean droplet'inde deploy eder

set -e

echo "🚀 MES Application Deployment Started..."

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
if [[ $EUID -eq 0 ]]; then
   print_error "Bu script root kullanıcısı ile çalıştırılmamalıdır!"
   exit 1
fi

# Update system
print_status "Sistem güncelleniyor..."
sudo apt update && sudo apt upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    print_status "Docker kuruluyor..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    print_status "Docker zaten kurulu."
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_status "Docker Compose kuruluyor..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    print_status "Docker Compose zaten kurulu."
fi

# Install UFW firewall
if ! command -v ufw &> /dev/null; then
    print_status "UFW firewall kuruluyor..."
    sudo apt install ufw -y
fi

# Configure firewall
print_status "Firewall yapılandırılıyor..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3001/tcp
sudo ufw --force enable

# Create application directory
APP_DIR="/home/$USER/mes-app"
print_status "Uygulama dizini oluşturuluyor: $APP_DIR"
mkdir -p $APP_DIR

print_status "Git repository'sini klonlayın veya dosyaları $APP_DIR dizinine kopyalayın"
print_warning "Deployment devam etmek için ENTER'a basın..."
read

# Check if application files exist
if [ ! -f "$APP_DIR/docker-compose.yml" ]; then
    print_error "docker-compose.yml dosyası bulunamadı! Lütfen dosyaları $APP_DIR dizinine kopyalayın."
    exit 1
fi

cd $APP_DIR

# Build and start containers
print_status "Docker container'ları build ediliyor..."
docker-compose build

print_status "Uygulamalar başlatılıyor..."
docker-compose up -d

# Wait for services to start
print_status "Servisler başlatılıyor... (30 saniye bekleniyor)"
sleep 30

# Check if services are running
print_status "Servis durumları kontrol ediliyor..."
docker-compose ps

# Test API
print_status "API test ediliyor..."
if curl -f http://localhost:3001/api/working-hours > /dev/null 2>&1; then
    print_status "✅ Backend API çalışıyor!"
else
    print_warning "⚠️  Backend API'ye erişilemiyor. Logları kontrol edin: docker-compose logs mes-backend"
fi

# Test Frontend
print_status "Frontend test ediliyor..."
if curl -f http://localhost > /dev/null 2>&1; then
    print_status "✅ Frontend çalışıyor!"
else
    print_warning "⚠️  Frontend'e erişilemiyor. Logları kontrol edin: docker-compose logs mes-frontend"
fi

# Display deployment info
print_status "🎉 Deployment tamamlandı!"
echo ""
echo "📍 Erişim Bilgileri:"
echo "   Frontend: http://$(curl -s ifconfig.me)"
echo "   Backend API: http://$(curl -s ifconfig.me):3001"
echo ""
echo "🔧 Yararlı Komutlar:"
echo "   Logları görüntüle: docker-compose logs -f"
echo "   Servisleri yeniden başlat: docker-compose restart"
echo "   Servisleri durdur: docker-compose down"
echo "   Güncelleme için: docker-compose pull && docker-compose up -d"
echo ""
print_warning "🔒 Güvenlik: Production'da domain adı ve SSL sertifikası eklemeyi unutmayın!"
