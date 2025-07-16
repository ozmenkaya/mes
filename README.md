# MES - Manufacturing Execution System (Üretim Yürütme Sistemi)

Modern, responsive ve kullanıcı dostu üretim yönetim sistemi.

## 🚀 Özellikler

### Ana Modüller
- **📊 Dashboard**: Gerçek zamanlı üretim görünümü ve KPI'lar
- **👥 Müşteri & Tedarikçi Yönetimi**: Kapsamlı firma yönetimi ve ERP entegrasyonu
- **⚙️ Fabrika Ayarları**: Çalışma saatleri, departmanlar, makine yönetimi
- **📱 Responsive Tasarım**: Tüm cihazlarda mükemmel deneyim
- **🔒 Güvenli**: Modern güvenlik standartları
- **🎨 Modern UI**: Material-UI ile tasarlanmış

### Teknolojiler
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Material-UI (MUI) v5
- **Backend**: Node.js (Express alternative) 
- **Database**: PostgreSQL 15 with persistent volumes
- **Deployment**: Docker + Docker Compose
- **State Management**: React Context API ve hooks
- **Routing**: React Router v6
- **Charts**: Recharts (gelecekte eklenecek)
- **Data Grids**: MUI X Data Grid (gelecekte eklenecek)
- **HTTP Client**: Axios
- **Date/Time**: Day.js

## 🗄️ Database & Data Persistence

- **Database**: PostgreSQL 15 with persistent Docker volumes
- **Backup System**: Automated daily backups with 7-day retention
- **Data Safety**: Zero data loss during deployments and updates
- **Development**: Continuous data persistence during development cycles
- **Production Ready**: ACID compliance and reliability

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum Adımları

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

3. **Tarayıcınızda açın:**
   ```
   http://localhost:5173
   ```

4. **Backend'i başlatın:**
   ```bash
   node simple-backend.cjs
   ```

## 🐳 Docker ile Deployment

### Yerel Deployment

```bash
# Tüm servisleri Docker ile başlatın
npm run deploy:local

# Logları izleyin
npm run docker:logs

# Servisleri durdurun
npm run docker:down
```

### DigitalOcean Production Deployment

#### Gereksinimler
- Ubuntu 20.04+ DigitalOcean Droplet (en az 2GB RAM)
- SSH erişimi

#### Deployment Adımları

1. **Droplet'e bağlanın:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Non-root kullanıcı oluşturun:**
   ```bash
   adduser mesuser
   usermod -aG sudo mesuser
   su - mesuser
   ```

3. **Repository'i klonlayın:**
   ```bash
   git clone <your-repo-url>
   cd mes
   ```

4. **Deploy script'ini çalıştırın:**
   ```bash
   ./deploy.sh
   ```

Deploy script otomatik olarak:
- ✅ Docker ve Docker Compose kurar
- ✅ Firewall yapılandırır (portlar: 22, 80, 443, 3001)
- ✅ Uygulamayı build eder
- ✅ Servisleri başlatır (Frontend: port 80, Backend: port 3001)
- ✅ Health check yapar

#### Erişim
- **Frontend**: `http://your-server-ip`
- **Backend API**: `http://your-server-ip:3001`

#### SSL Kurulumu (İsteğe bağlı)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir UI bileşenleri
│   └── Layout.tsx      # Ana layout bileşeni
├── pages/              # Sayfa seviyesi bileşenler
│   ├── Dashboard.tsx
│   ├── WorkOrders.tsx
│   ├── Production.tsx
│   ├── Quality.tsx
│   ├── Inventory.tsx
│   ├── Equipment.tsx
│   └── Reports.tsx
├── services/           # API servis fonksiyonları
│   └── api.ts
├── types/              # TypeScript tip tanımları
│   └── index.ts
├── theme/              # Material-UI tema konfigürasyonu
│   └── index.ts
└── App.tsx             # Ana uygulama bileşeni
```

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Projeyi build et
npm run build

# Build'i önizle
npm run preview

# Linting
npm run lint
```

## 🎨 Tema ve Stil

Proje Material-UI tema sistemini kullanmaktadır:
- Ana renk: Mavi (#1976d2)
- İkincil renk: Turuncu (#ff9800)
- Modern, temiz ve endüstriyel tasarım
- Responsive tasarım (mobil ve masaüstü uyumlu)

## 📊 Dashboard Özellikleri

- **Gerçek Zamanlı Metrikler**: Aktif iş emirleri, günlük tamamlanan işler
- **Verimlilik Göstergeleri**: Genel verimlilik, kalite oranı
- **Sistem Durumu**: Ekipman kullanımı, zamanında teslimat oranları
- **Görsel Analitik**: Grafik ve çizelgeler (gelecekte eklenecek)

## 🔮 Gelecek Özellikler

- [ ] Gerçek zamanlı WebSocket bağlantısı
- [ ] Veritabanı entegrasyonu
- [ ] Kullanıcı kimlik doğrulama sistemi
- [ ] Çoklu dil desteği
- [ ] Mobil uygulama
- [ ] API entegrasyonu
- [ ] Grafik ve analitik modülleri
- [ ] Raporlama sistemi

## 🏗️ Mimari

Bu MES sistemi modern web teknolojileri kullanılarak geliştirilmiştir:

- **Modüler Yapı**: Her modül bağımsız olarak geliştirilebilir
- **TypeScript**: Tip güvenliği ve geliştirici deneyimi
- **Material Design**: Tutarlı ve modern UI/UX
- **Responsive Design**: Tüm cihazlarda optimum deneyim

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için lütfen iletişime geçin.

---

**MES - Manufacturing Execution System** 🏭
