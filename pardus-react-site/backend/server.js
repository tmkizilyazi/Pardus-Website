const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Ortam değişkenlerini yükle
dotenv.config();

// Express uygulamasını oluştur
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosyalar için klasör
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API rotaları
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Stripe webhook için raw body
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// Hata işleme middleware'leri
app.use(notFound);
app.use(errorHandler);

// MongoDB bağlantısı
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pardus_sportswear')
    .then(() => {
        console.log('MongoDB bağlantısı başarılı');
    })
    .catch((err) => {
        console.error('MongoDB bağlantı hatası:', err.message);
    });

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
}); 