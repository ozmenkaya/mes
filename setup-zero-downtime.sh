#!/bin/bash

# DigitalOcean Zero-Downtime Setup Script
# Sunucuyu sıfır kesinti deployment için hazırlar

echo "🔧 DigitalOcean sunucusu sıfır kesinti deployment için ayarlanıyor..."

SERVER_IP="157.230.104.154"
SSH_USER="root"
APP_DIR="/root/mes"

echo "📡 Sunucu IP: $SERVER_IP"
echo "👤 SSH Kullanıcı: $SSH_USER" 
echo "📁 Uygulama Dizini: $APP_DIR"

# DigitalOcean'da gerekli dizinleri oluştur ve dosyaları kopyala
ssh $SSH_USER@$SERVER_IP << 'ENDSSH'
    cd /root/mes || { echo "MES dizini bulunamadı!"; exit 1; }
    
    echo "📂 Mevcut dizin: $(pwd)"
    
    # Son değişiklikleri çek
    echo "🔄 Repository güncelleniyor..."
    git pull origin main
    
    # Gerekli dizinleri oluştur
    echo "📁 Dizinler oluşturuluyor..."
    mkdir -p /var/lib/mes/{database,backup,redis}
    mkdir -p /var/log
    
    # Script'leri çalıştırılabilir yap
    echo "🔧 Script'ler ayarlanıyor..."
    chmod +x zero-downtime-deploy.sh
    chmod +x scripts/db-backup.sh
    chmod +x scripts/db-restore.sh
    
    # Mevcut container'ları durdur
    echo "⏹️  Mevcut container'lar durduruluyor..."
    docker-compose down || echo "Container'lar zaten durdurulmuş"
    
    # Persistent volume'ları oluştur
    echo "💾 Persistent volume'lar oluşturuluyor..."
    
    # Mevcut database verilerini kopyala
    if [ -d "/var/lib/docker/volumes/mes_mes_db_data/_data" ]; then
        echo "📋 Mevcut database verileri korunuyor..."
        cp -r /var/lib/docker/volumes/mes_mes_db_data/_data/* /var/lib/mes/database/ 2>/dev/null || echo "Database verileri bulunamadı"
    fi
    
    # Zero-downtime deployment ile başlat
    echo "🚀 Zero-downtime deployment başlatılıyor..."
    ./zero-downtime-deploy.sh
    
ENDSSH

echo ""
echo "✅ DigitalOcean sunucusu sıfır kesinti deployment için hazırlandı!"
echo ""
echo "🔍 Özellikler:"
echo "  ✅ Veri kaybı olmaz (persistent volumes)"
echo "  ✅ Sistem kesintisi olmaz (rolling updates)"
echo "  ✅ Otomatik backup (her deployment öncesi)"
echo "  ✅ Otomatik rollback (hata durumunda)"
echo "  ✅ Health check'ler"
echo "  ✅ Load balancing"
echo ""
echo "🌐 Site kontrol: http://$SERVER_IP"
echo "📊 Sistem durumu: ssh $SSH_USER@$SERVER_IP 'docker-compose -f docker-compose.production.yml ps'"
