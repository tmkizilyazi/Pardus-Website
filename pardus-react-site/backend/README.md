# Pardus Sportswear Backend

Bu klasör, Pardus Sportswear e-ticaret sitesinin backend kodlarını içerir. Backend, Node.js ve Express.js kullanılarak geliştirilmiştir ve MongoDB veritabanı ile entegre edilmiştir.

## Teknoloji Yığını

- **Node.js**: JavaScript runtime ortamı
- **Express.js**: Web uygulama çerçevesi
- **MongoDB**: NoSQL veritabanı
- **Mongoose**: MongoDB nesne modelleme aracı
- **JWT**: Kimlik doğrulama için JSON Web Token
- **Stripe**: Ödeme işlemleri için
- **Multer**: Dosya yükleme işlemleri için
- **Cors**: Cross-Origin Resource Sharing için
- **Dotenv**: Ortam değişkenleri için

## Kurulum

1. Node.js ve MongoDB'nin bilgisayarınızda kurulu olduğundan emin olun.
2. Bu klasöre gidin ve bağımlılıkları yükleyin:

```bash
cd backend
npm install
```

3. `.env` dosyasını oluşturun ve gerekli ortam değişkenlerini ayarlayın:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pardus_sportswear
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

4. Sunucuyu başlatın:

```bash
npm start
```

## API Endpoints

### Ürünler

- `GET /api/products`: Tüm ürünleri listeler
- `GET /api/products/:id`: Belirli bir ürünün detaylarını getirir
- `POST /api/products`: Yeni bir ürün ekler (Admin)
- `PUT /api/products/:id`: Bir ürünü günceller (Admin)
- `DELETE /api/products/:id`: Bir ürünü siler (Admin)

### Kategoriler

- `GET /api/categories`: Tüm kategorileri listeler
- `GET /api/categories/:id`: Belirli bir kategorinin detaylarını getirir
- `POST /api/categories`: Yeni bir kategori ekler (Admin)
- `PUT /api/categories/:id`: Bir kategoriyi günceller (Admin)
- `DELETE /api/categories/:id`: Bir kategoriyi siler (Admin)

### Kullanıcılar

- `POST /api/users/register`: Yeni bir kullanıcı kaydeder
- `POST /api/users/login`: Kullanıcı girişi yapar
- `GET /api/users/profile`: Kullanıcı profilini getirir
- `PUT /api/users/profile`: Kullanıcı profilini günceller

### Siparişler

- `POST /api/orders`: Yeni bir sipariş oluşturur
- `GET /api/orders`: Kullanıcının siparişlerini listeler
- `GET /api/orders/:id`: Belirli bir siparişin detaylarını getirir
- `PUT /api/orders/:id/pay`: Bir siparişi ödenmiş olarak işaretler
- `GET /api/orders/admin`: Tüm siparişleri listeler (Admin)

### Ödeme

- `POST /api/payment/create-payment-intent`: Stripe ödeme niyeti oluşturur
- `POST /api/payment/webhook`: Stripe webhook işleyicisi

## Veritabanı Modelleri

### Ürün Modeli

```javascript
{
  name: String,
  description: String,
  price: Number,
  discountPrice: Number,
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sizes: [{ size: String, available: Boolean }],
  colors: [{ name: String, code: String }],
  features: [String],
  stock: Number,
  rating: Number,
  numReviews: Number,
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      rating: Number,
      comment: String,
      date: Date
    }
  ],
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Kategori Modeli

```javascript
{
  name: String,
  description: String,
  featured: Boolean,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Kullanıcı Modeli

```javascript
{
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Sipariş Modeli

```javascript
{
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [
    {
      name: String,
      qty: Number,
      image: String,
      price: Number,
      size: String,
      color: String,
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }
  ],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Güvenlik

- JWT tabanlı kimlik doğrulama
- Şifrelerin bcrypt ile hashlenmesi
- Rol tabanlı erişim kontrolü (Admin vs Normal Kullanıcı)
- Stripe güvenli ödeme entegrasyonu
- CORS koruması
- Rate limiting
- Helmet ile HTTP başlık güvenliği

## Dosya Yapısı

```
backend/
  ├── config/         # Yapılandırma dosyaları
  ├── controllers/    # API endpoint işleyicileri
  ├── middleware/     # Ara yazılımlar (auth, error handling, etc.)
  ├── models/         # Mongoose modelleri
  ├── routes/         # API rotaları
  ├── utils/          # Yardımcı fonksiyonlar
  ├── uploads/        # Yüklenen dosyalar
  ├── .env            # Ortam değişkenleri
  ├── package.json    # Proje bağımlılıkları
  └── server.js       # Ana uygulama dosyası
```

## Geliştirme

Geliştirme modunda sunucuyu başlatmak için:

```bash
npm run dev
```

Bu, nodemon kullanarak sunucuyu başlatır ve kod değişikliklerinde otomatik olarak yeniden başlatır.

## Dağıtım

Projeyi üretim ortamına dağıtmak için:

1. `.env` dosyasındaki ortam değişkenlerini üretim ortamına uygun şekilde ayarlayın.
2. Bağımlılıkları yükleyin ve uygulamayı oluşturun:

```bash
npm install
npm run build
```

3. Uygulamayı başlatın:

```bash
npm start
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 