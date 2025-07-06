# Üretim Yürütme Sistemi (ÜYS)

Modern bir Manufacturing Execution System (Üretim Yürütme Sistemi) web uygulaması.

## 🏭 Özellikler

### Ana Modüller
- **Dashboard**: Gerçek zamanlı üretim görünümü ve KPI'lar
- **Work Order Management**: İş emri oluşturma, takip ve yönetimi
- **Production Planning**: Üretim planlama ve çizelgeleme
- **Quality Management**: Kalite kontrol, muayene ve uygunsuzluk yönetimi
- **Inventory Management**: Hammadde, yarı mamul ve mamul stok takibi
- **Equipment Management**: Ekipman, personel ve araç yönetimi
- **Reports & Analytics**: Üretim raporları, verimlilik metrikleri ve analitik

### Teknolojiler
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Material-UI (MUI) v5
- **State Management**: React Context API ve hooks
- **Routing**: React Router v6
- **Charts**: Recharts (gelecekte eklenecek)
- **Data Grids**: MUI X Data Grid (gelecekte eklenecek)
- **HTTP Client**: Axios
- **Date/Time**: Day.js

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
