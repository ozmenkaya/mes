#!/bin/bash

# Quick MES Deployment for DigitalOcean
# Bu script en hızlı deployment için kullanılabilir

echo "🚀 MES Quick Deployment başlatılıyor..."

# Root kontrolü
if [[ $EUID -eq 0 ]]; then
    echo "✅ Root kullanıcısı algılandı."
    
    # Hızlı sistem güncellemesi
    apt update -y
    
    # Docker kurulumu
    if ! command -v docker &> /dev/null; then
        echo "📦 Docker kuruluyor..."
        curl -fsSL https://get.docker.com | sh
    fi
    
    # Docker Compose kurulumu
    if ! command -v docker-compose &> /dev/null; then
        echo "📦 Docker Compose kuruluyor..."
        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
    fi
    
    # Firewall basit ayarı
    ufw --force enable
    ufw allow 22
    ufw allow 80
    ufw allow 443
    
    # Repository klonla
    cd /root
    if [ -d "mes" ]; then
        cd mes
        git pull
    else
        git clone https://github.com/ozmenkaya/mes.git
        cd mes
    fi
    
    # Deploy
    echo "� Docker servisleri başlatılıyor..."
    docker-compose down 2>/dev/null || true
    docker-compose up -d --build
    
    # Sonuç
    echo ""
    echo "✅ Deployment tamamlandı!"
    echo "🌐 Site adresi: http://$(curl -s ifconfig.me)"
    echo "📊 Servis durumu:"
    docker-compose ps
    
else
    echo "❌ Bu script root kullanıcısı ile çalıştırılmalıdır!"
    echo "Kullanım: curl -s https://raw.githubusercontent.com/ozmenkaya/mes/main/quick-deploy.sh | sudo bash"
    exit 1
fi

echo "🔍 ADIM 4: Test komutları"
echo "-------------------------"
echo "# Frontend test:"
echo "curl http://localhost"
echo ""
echo "# Backend API test:"
echo "curl http://localhost:3001/api/working-hours"
echo ""
echo "# Servis durumu:"
echo "docker-compose ps"
echo ""
echo "# Logları izle:"
echo "docker-compose logs -f"
echo ""

echo "🌐 ADIM 5: Erişim bilgileri"
echo "----------------------------"
echo "Public IP adresinizi öğrenin:"
echo "curl ifconfig.me"
echo ""
echo "Tarayıcıda açın:"
echo "http://YOUR_PUBLIC_IP"
echo ""

echo "🔒 ADIM 6: SSL kurulumu (isteğe bağlı)"
echo "--------------------------------------"
echo "sudo apt install certbot python3-certbot-nginx"
echo "sudo certbot --nginx -d yourdomain.com"
echo ""

echo "✅ Deployment tamamlandı!"
echo "Sorularınız için: https://github.com/ozmenkaya/mes/issues"
