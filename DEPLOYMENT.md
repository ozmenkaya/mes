# 🚀 MES - DigitalOcean Deployment Rehberi

Bu dosya MES uygulamanızı DigitalOcean'da deploy etmek için adım adım talimatları içerir.

## 📋 Ön Hazırlık

### 1. DigitalOcean Droplet Oluşturun
- **OS**: Ubuntu 20.04 LTS
- **Size**: En az 2GB RAM (Basic $12/month önerilir)
- **Region**: Size en yakın bölge
- **SSH Key**: SSH anahtarınızı ekleyin

### 2. DNS Ayarları (İsteğe bağlı)
Eğer domain adınız varsa, A record'unu droplet IP'nize yönlendirin.

## 🚀 Deployment Adımları

### 1. Sunucuya Bağlanın
```bash
ssh root@YOUR_DROPLET_IP
```

### 2. Non-root Kullanıcı Oluşturun
```bash
adduser mesuser
usermod -aG sudo mesuser
su - mesuser
```

### 3. Repository'i Klonlayın
```bash
git clone https://github.com/YOUR_USERNAME/mes.git
cd mes
```

*Not: GitHub repository'nizi public yapın veya SSH key ekleyin*

### 4. Otomatik Deployment
```bash
chmod +x deploy.sh
./deploy.sh
```

Bu script:
- ✅ Docker & Docker Compose kurar
- ✅ Firewall yapılandırır
- ✅ Uygulamayı build eder
- ✅ Servisleri başlatır

### 5. Erişim Testi
```bash
# Frontend testi
curl http://localhost

# Backend API testi  
curl http://localhost:3001/api/working-hours
```

## 🔧 Manuel Deployment (İsteğe bağlı)

Eğer otomatik script çalışmazsa:

### 1. Docker Kurulumu
```bash
# Docker kur
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Docker Compose kur
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Yeniden login
exit
ssh mesuser@YOUR_DROPLET_IP
```

### 2. Firewall Yapılandırması
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3001/tcp
sudo ufw --force enable
```

### 3. Uygulamayı Başlatın
```bash
cd mes
docker-compose up --build -d
```

## 📊 Monitoring

### Logları İzleyin
```bash
# Tüm servisler
docker-compose logs -f

# Sadece backend
docker-compose logs -f mes-backend

# Sadece frontend
docker-compose logs -f mes-frontend
```

### Servis Durumu
```bash
docker-compose ps
```

### Health Check
```bash
# API health check
curl http://YOUR_DROPLET_IP:3001/api/working-hours

# Frontend check
curl http://YOUR_DROPLET_IP
```

## 🔒 Güvenlik (Production Önerileri)

### 1. SSL Sertifikası (Certbot)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 2. Backup Script
```bash
#!/bin/bash
# backup.sh
docker-compose exec mes-backend node -e "console.log('Backup script here')"
```

### 3. Monitoring Ekleme
- Uptime monitoring servisi kullanın
- Log monitoring ekleyin
- Disk usage monitoring

### 4. Güvenlik Duvarı İyileştirmeleri
```bash
# Sadece belirli IP'lerden SSH erişimi
sudo ufw delete allow ssh
sudo ufw allow from YOUR_IP to any port 22

# API portunu sadece nginx'e açma
sudo ufw delete allow 3001
# (Nginx proxy kullanırken)
```

## 🔄 Güncelleme

### Yeni Deployment
```bash
cd mes
git pull origin main
docker-compose down
docker-compose up --build -d
```

### Rolling Update
```bash
docker-compose pull
docker-compose up -d --no-deps --build mes-frontend
docker-compose up -d --no-deps --build mes-backend
```

## 🆘 Sorun Giderme

### Common Issues

1. **Port zaten kullanımda**
   ```bash
   sudo lsof -i :80
   sudo lsof -i :3001
   ```

2. **Docker permission denied**
   ```bash
   sudo usermod -aG docker $USER
   # Logout/login gerekli
   ```

3. **Out of disk space**
   ```bash
   docker system prune -a
   ```

4. **Memory issues**
   ```bash
   free -h
   docker stats
   ```

### Yararlı Komutlar
```bash
# Container'a shell erişimi
docker-compose exec mes-backend sh
docker-compose exec mes-frontend sh

# Volume'leri temizle
docker volume prune

# Tüm Docker nesnelerini temizle
docker system prune -a --volumes
```

## 📞 Destek

Sorun yaşarsanız:
1. Logları kontrol edin: `docker-compose logs -f`
2. GitHub Issues açın
3. Community forumlarını kontrol edin

---

## 🎉 Başarılı Deployment!

Deployment başarılı olursa:
- **Frontend**: http://YOUR_DROPLET_IP
- **Backend**: http://YOUR_DROPLET_IP:3001
- **Health Check**: http://YOUR_DROPLET_IP:3001/api/working-hours

**Production'da domain adı ve SSL eklemeyi unutmayın!** 🔒
