#!/bin/bash

# DigitalOcean MES Deployment Update Script
# Mevcut deployment'ı responsive tasarımlarla günceller

echo "🔄 DigitalOcean MES Deployment Güncelleniyor..."

# Sunucu IP'sini buraya girin - lütfen gerçek IP'yi girin
SERVER_IP="157.230.104.154"
SSH_USER="root"  # veya kullanıcı adınız
APP_DIR="/root/mes"  # veya uygulamanızın kurulu olduğu dizin

echo "📡 Sunucu IP: $SERVER_IP"
echo "👤 SSH Kullanıcı: $SSH_USER"
echo "📁 Uygulama Dizini: $APP_DIR"

# SSH ile bağlanıp güncelleme komutları
ssh $SSH_USER@$SERVER_IP << 'ENDSSH'
    cd /root/mes || { echo "MES dizini bulunamadı!"; exit 1; }
    
    echo "📂 Mevcut dizin: $(pwd)"
    
    # Git repository güncelle
    echo "🔄 Repository güncelleniyor..."
    git pull origin main
    
    # Container'ları yeniden build et
    echo "🏗️ Container'lar yeniden build ediliyor..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    
    # Durum kontrolü
    echo "✅ Deployment durumu:"
    docker-compose ps
    
    # Health check
    sleep 30
    echo "🏥 Health check..."
    curl -I http://localhost || echo "Frontend check failed"
    curl -I http://localhost:3001/api/working-hours || echo "Backend check failed"
    
    echo "🎉 Güncelleme tamamlandı!"
    
ENDSSH

echo "✅ DigitalOcean deployment güncellendi!"
echo "🌐 Sitenizi kontrol edin: http://$SERVER_IP"
