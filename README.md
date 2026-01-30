# Trabzon App

Trabzon şehrine özel iOS mobil uygulaması.

## Özellikler

- 🚌 **Otobüs Hatları**: Şehir içi otobüs güzergahları ve sefer bilgileri
- 📰 **Haberler**: Trabzon'dan son haberler ve gelişmeler
- 🏛️ **Gezilecek Yerler**: Tarihi ve turistik mekanlar
- 🎭 **Etkinlikler**: Kültürel etkinlikler ve festivaller

## Kurulum

### Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS Simulator (macOS için) veya Expo Go uygulaması (fiziksel cihaz için)

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Uygulamayı başlatın:
```bash
npx expo start
```

3. iOS'ta çalıştırmak için:
   - **Expo Go ile**: QR kodunu telefonunuzla tarayın
   - **iOS Simulator ile**: Terminal'de `i` tuşuna basın

## Proje Yapısı

```
├── App.tsx                 # Ana uygulama ve navigasyon
├── src/
│   └── screens/
│       ├── HomeScreen.tsx      # Ana menü ekranı
│       ├── BusRoutesScreen.tsx # Otobüs hatları
│       ├── NewsScreen.tsx      # Haberler
│       ├── PlacesScreen.tsx    # Gezilecek yerler
│       └── EventsScreen.tsx    # Etkinlikler
├── assets/                 # Görsel dosyalar
├── app.json               # Expo konfigürasyonu
├── package.json           # Proje bağımlılıkları
└── tsconfig.json          # TypeScript konfigürasyonu
```

## Teknolojiler

- React Native
- Expo
- TypeScript
- React Navigation

## Geliştirme Notları

- Uygulama şu an örnek verilerle çalışmaktadır
- Gerçek API entegrasyonu ileride eklenecektir
- Görseller placeholder olarak emoji kullanmaktadır

## Lisans

MIT
