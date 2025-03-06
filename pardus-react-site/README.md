# Pardus React Web Sitesi

Bu proje, Pardus işletim sistemi için modern ve etkileşimli bir web sitesi oluşturmak amacıyla React kullanılarak geliştirilmiştir.

## Özellikler

- Modern ve duyarlı tasarım
- Styled Components ile gelişmiş CSS yönetimi
- React Router ile sayfa yönlendirme
- Framer Motion ile animasyonlar
- Stripe ödeme entegrasyonu
- Mobil uyumlu arayüz

## Kurulum

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Projeyi klonlayın
git clone https://github.com/your-username/pardus-react-site.git

# Proje dizinine gidin
cd pardus-react-site

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyebilirsiniz.

## Kullanılan Teknolojiler

- React
- React Router
- Styled Components
- Framer Motion
- Stripe Payment
- React Icons

## Proje Yapısı

```
src/
  ├── assets/         # Resimler ve diğer statik dosyalar
  ├── components/     # Yeniden kullanılabilir bileşenler
  │   ├── donation/   # Bağış ile ilgili bileşenler
  │   ├── home/       # Ana sayfa bileşenleri
  │   └── layout/     # Header, Footer gibi düzen bileşenleri
  ├── pages/          # Sayfa bileşenleri
  ├── services/       # API istekleri ve diğer servisler
  ├── styles/         # Global stiller ve tema
  ├── App.js          # Ana uygulama bileşeni
  └── index.js        # Giriş noktası
```

## Stripe Entegrasyonu

Bağış özelliğini kullanmak için:

1. [Stripe Dashboard](https://dashboard.stripe.com/) üzerinden bir hesap oluşturun
2. API anahtarlarınızı alın
3. `src/components/donation/DonationForm.js` dosyasındaki `stripePromise` değişkenini kendi API anahtarınızla güncelleyin

## Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.

## İletişim

Sorularınız veya geri bildirimleriniz için [email@example.com](mailto:email@example.com) adresine e-posta gönderebilirsiniz.
