// DatabaseService.js
// Bu servis, gerçek bir veritabanı bağlantısı olmadan localStorage ile çalışan basit bir veritabanı servisidir.

class DatabaseService {
    constructor() {
        // LocalStorage'dan mevcut veritabanını yükle veya yeni oluştur
        this.loadDatabase();
    }

    // Veritabanını localStorage'dan yükle
    loadDatabase() {
        try {
            const dbString = localStorage.getItem('pardusDB');
            this.db = dbString ? JSON.parse(dbString) : this.createInitialDB();
            console.log('[DatabaseService] Veritabanı yüklendi:', this.db);
        } catch (error) {
            console.error('[DatabaseService] Veritabanı yüklenirken hata:', error);
            this.db = this.createInitialDB();
        }
    }

    // Veritabanı değişikliklerini kaydet
    saveDatabase() {
        try {
            localStorage.setItem('pardusDB', JSON.stringify(this.db));
            console.log('[DatabaseService] Veritabanı kaydedildi');
        } catch (error) {
            console.error('[DatabaseService] Veritabanı kaydedilirken hata:', error);
        }
    }

    // İlk veritabanı yapısını oluştur
    createInitialDB() {
        console.log('[DatabaseService] Yeni veritabanı oluşturuluyor');

        // Başlangıç ürünlerini oluştur
        const initialProducts = [
            {
                id: 1,
                name: 'Pardus Pro X9 Krampon',
                price: 2499.99,
                discount: 2999.99,
                category: 'Krampon',
                subCategory: 'Profesyonel',
                description: "Pardus Pro X9, profesyonel futbolcular için tasarlanmış üst düzey bir krampondur. Karbon fiber taban ve özel pençe tasarımlı çiviler sayesinde sahada rakiplerinizden bir adım önde olun.",
                rating: 4.9,
                reviews: 128,
                stock: 15,
                image: '/PARDUS AYK.-1.png',
                images: ['/PARDUS AYK.-1.png', '/PARDUS AYK.-1.png', '/PARDUS AYK.-1.png'],
                colors: [
                    { id: 1, name: 'Siyah', code: '#000000' },
                    { id: 2, name: 'Turuncu', code: '#FF6B00' },
                    { id: 3, name: 'Mavi', code: '#0057FF' }
                ],
                sizes: [
                    { id: 1, size: '38', available: true },
                    { id: 2, size: '39', available: true },
                    { id: 3, size: '40', available: true },
                    { id: 4, size: '41', available: true },
                    { id: 5, size: '42', available: true }
                ],
                isNew: true,
                features: [
                    'Karbon fiber taban',
                    'Ultra hafif yapı (sadece 210g)',
                    'Su geçirmez dış yüzey'
                ],
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Pardus Speed Elite',
                price: 1899.99,
                discount: null,
                category: 'Krampon',
                subCategory: 'Hız',
                description: "Hız odaklı oyuncular için tasarlanmış özel krampon. Hafif yapısı ve aerodinamik tasarımı ile sahada fark yaratın.",
                rating: 4.7,
                reviews: 94,
                stock: 23,
                image: '/PARDUS AYK.-1.png',
                images: ['/PARDUS AYK.-1.png', '/PARDUS AYK.-1.png'],
                colors: [
                    { id: 1, name: 'Kırmızı', code: '#ff0000' },
                    { id: 2, name: 'Beyaz', code: '#ffffff' },
                    { id: 3, name: 'Siyah', code: '#000000' }
                ],
                sizes: [
                    { id: 1, size: '39', available: true },
                    { id: 2, size: '40', available: true },
                    { id: 3, size: '41', available: true }
                ],
                isNew: false,
                features: [
                    'Aerodinamik tasarım',
                    'Hız odaklı çivi yapısı',
                    'Mikro fiber üst yüzey'
                ],
                createdAt: new Date(Date.now() - 86400000).toISOString() // 1 gün önce
            },
            {
                id: 3,
                name: 'Pardus Urban Style',
                price: 1599.99,
                discount: 1799.99,
                category: 'Sneakers',
                subCategory: 'Günlük',
                description: "Şehir yaşamı için tasarlanmış şık ve rahat sneaker. Modern tasarımı ve konforuyla hem sporda hem günlük yaşamda yanınızda.",
                rating: 4.8,
                reviews: 112,
                stock: 42,
                image: '/PARDUS AYK.-1.png',
                images: ['/PARDUS AYK.-1.png', '/PARDUS AYK.-1.png', '/PARDUS AYK.-1.png'],
                colors: [
                    { id: 1, name: 'Altın', code: '#ffd700' },
                    { id: 2, name: 'Siyah', code: '#000000' }
                ],
                sizes: [
                    { id: 1, size: '40', available: true },
                    { id: 2, size: '41', available: true },
                    { id: 3, size: '42', available: true },
                    { id: 4, size: '43', available: true }
                ],
                isNew: true,
                features: [
                    'Hafif yapı',
                    'Nefes alabilir malzeme',
                    'Darbe emici taban'
                ],
                createdAt: new Date(Date.now() - 172800000).toISOString() // 2 gün önce
            }
        ];

        return {
            products: initialProducts,     // Ürünler koleksiyonu
            orders: [],                    // Siparişler koleksiyonu
            users: [],                     // Kullanıcılar koleksiyonu
            cartItems: [],                 // Sepet öğeleri koleksiyonu
            categories: [                  // Kategoriler koleksiyonu
                { id: 1, name: 'Krampon', productCount: 2, featured: true },
                { id: 2, name: 'Sneakers', productCount: 1, featured: true },
                { id: 3, name: 'Koşu Ayakkabısı', productCount: 0, featured: false },
                { id: 4, name: 'Terlik', productCount: 0, featured: false }
            ],
            lastUpdate: new Date().toISOString()
        };
    }

    // ======================== ÜRÜN YÖNETİMİ ========================

    // Tüm ürünleri getir
    getProducts() {
        console.log('[DatabaseService] Ürünler alınıyor:', this.db.products);
        return this.db.products;
    }

    // En son eklenen ürünleri getir
    getLatestProducts(limit = 4) {
        const sortedProducts = [...this.db.products].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        return sortedProducts.slice(0, limit);
    }

    // Kategoriye göre ürünleri filtrele
    getProductsByCategory(category) {
        return this.db.products.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Ürün ekleme
    addProduct(product) {
        console.log('[DatabaseService] Ürün ekleniyor:', product);

        // ID oluştur
        const newId = this.db.products.length > 0
            ? Math.max(...this.db.products.map(p => p.id)) + 1
            : 1;

        // Yeni ürün
        const newProduct = {
            ...product,
            id: newId,
            createdAt: new Date().toISOString()
        };

        // Ürünler listesine ekle
        this.db.products.push(newProduct);

        // İlgili kategorinin ürün sayısını artır
        this.updateCategoryProductCount(product.category);

        // Veritabanını kaydet
        this.db.lastUpdate = new Date().toISOString();
        this.saveDatabase();

        return newProduct;
    }

    // Ürün düzenleme
    updateProduct(productId, updatedData) {
        console.log('[DatabaseService] Ürün güncelleniyor, ID:', productId, 'Veri:', updatedData);

        const productIndex = this.db.products.findIndex(p => p.id === productId);

        if (productIndex >= 0) {
            // Eski kategori
            const oldCategory = this.db.products[productIndex].category;

            // Ürünü güncelle
            this.db.products[productIndex] = {
                ...this.db.products[productIndex],
                ...updatedData,
                updatedAt: new Date().toISOString()
            };

            // Kategori değiştiyse ürün sayılarını güncelle
            if (oldCategory !== updatedData.category) {
                this.updateCategoryProductCount(oldCategory, -1); // Eski kategoriden çıkar
                this.updateCategoryProductCount(updatedData.category); // Yeni kategoriye ekle
            }

            // Veritabanını kaydet
            this.db.lastUpdate = new Date().toISOString();
            this.saveDatabase();

            return this.db.products[productIndex];
        }

        console.warn('[DatabaseService] Güncellenecek ürün bulunamadı');
        return null;
    }

    // Ürün silme
    deleteProduct(productId) {
        console.log('[DatabaseService] Ürün siliniyor, ID:', productId);

        const productIndex = this.db.products.findIndex(p => p.id === productId);

        if (productIndex >= 0) {
            // Silinen ürünün kategorisi
            const category = this.db.products[productIndex].category;

            // Ürünü listeden kaldır
            this.db.products.splice(productIndex, 1);

            // Kategorinin ürün sayısını azalt
            this.updateCategoryProductCount(category, -1);

            // Veritabanını kaydet
            this.db.lastUpdate = new Date().toISOString();
            this.saveDatabase();

            return true;
        }

        console.warn('[DatabaseService] Silinecek ürün bulunamadı');
        return false;
    }

    // Kategori ürün sayısını güncelle
    updateCategoryProductCount(categoryName, change = 1) {
        const categoryIndex = this.db.categories.findIndex(
            c => c.name.toLowerCase() === categoryName.toLowerCase()
        );

        if (categoryIndex >= 0) {
            this.db.categories[categoryIndex].productCount += change;
        } else if (change > 0) {
            // Yeni kategori oluştur
            this.db.categories.push({
                id: this.db.categories.length > 0
                    ? Math.max(...this.db.categories.map(c => c.id)) + 1
                    : 1,
                name: categoryName,
                productCount: 1,
                featured: false
            });
        }
    }

    // ======================== SEPET YÖNETİMİ ========================

    // Sepete ürün ekle
    addToCart(item) {
        console.log('[DatabaseService] Sepete ekleniyor:', item);
        // Önce aynı ürün var mı diye kontrol et
        const existingItemIndex = this.db.cartItems.findIndex(
            i => i.productId === item.productId &&
                i.size === item.size &&
                i.color === item.color
        );

        if (existingItemIndex >= 0) {
            // Varsa miktarını güncelle
            this.db.cartItems[existingItemIndex].quantity += item.quantity;
            console.log('[DatabaseService] Mevcut ürünün miktarı güncellendi');
        } else {
            // Yoksa yeni ekle
            this.db.cartItems.push({
                ...item,
                id: Date.now(), // Benzersiz ID oluştur
                addedAt: new Date().toISOString()
            });
            console.log('[DatabaseService] Yeni ürün sepete eklendi');
        }

        this.db.lastUpdate = new Date().toISOString();
        this.saveDatabase();
        return this.db.cartItems;
    }

    // Sepetten ürün çıkar
    removeFromCart(id) {
        console.log('[DatabaseService] Sepetten ürün çıkarılıyor, ID:', id);
        this.db.cartItems = this.db.cartItems.filter(item => item.id !== id);
        this.db.lastUpdate = new Date().toISOString();
        this.saveDatabase();
        return this.db.cartItems;
    }

    // Sepeti tamamen temizle
    clearCart() {
        console.log('[DatabaseService] Sepet temizleniyor');
        this.db.cartItems = [];
        this.db.lastUpdate = new Date().toISOString();
        this.saveDatabase();
        return this.db.cartItems;
    }

    // Sepetteki tüm öğeleri getir
    getCartItems() {
        console.log('[DatabaseService] Sepet öğeleri alınıyor:', this.db.cartItems);
        return this.db.cartItems;
    }

    // Sepet öğesi miktarını güncelle
    updateCartItemQuantity(id, quantity) {
        console.log('[DatabaseService] Sepet öğesi miktarı güncelleniyor, ID:', id, 'Miktar:', quantity);
        const itemIndex = this.db.cartItems.findIndex(item => item.id === id);
        if (itemIndex >= 0) {
            this.db.cartItems[itemIndex].quantity = quantity;
            this.db.lastUpdate = new Date().toISOString();
            this.saveDatabase();
            console.log('[DatabaseService] Miktar güncellendi');
        } else {
            console.warn('[DatabaseService] Güncellenecek öğe bulunamadı');
        }
        return this.db.cartItems;
    }

    // ======================== SİPARİŞ YÖNETİMİ ========================

    // Sipariş oluştur
    createOrder(orderData) {
        console.log('[DatabaseService] Yeni sipariş oluşturuluyor:', orderData);
        const newOrder = {
            ...orderData,
            id: `ORD-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        this.db.orders.push(newOrder);
        // Sipariş oluşturulduktan sonra sepeti temizle
        this.clearCart();

        this.db.lastUpdate = new Date().toISOString();
        this.saveDatabase();
        return newOrder;
    }

    // Tüm siparişleri getir
    getOrders() {
        console.log('[DatabaseService] Siparişler alınıyor:', this.db.orders);
        return this.db.orders;
    }

    // Sipariş durumunu güncelle
    updateOrderStatus(orderId, status) {
        console.log('[DatabaseService] Sipariş durumu güncelleniyor, ID:', orderId, 'Durum:', status);
        const orderIndex = this.db.orders.findIndex(order => order.id === orderId);
        if (orderIndex >= 0) {
            this.db.orders[orderIndex].status = status;
            this.db.orders[orderIndex].updatedAt = new Date().toISOString();
            this.db.lastUpdate = new Date().toISOString();
            this.saveDatabase();
            console.log('[DatabaseService] Sipariş durumu güncellendi');
        } else {
            console.warn('[DatabaseService] Güncellenecek sipariş bulunamadı');
        }
        return this.db.orders[orderIndex];
    }

    // ======================== KATEGORİ YÖNETİMİ ========================

    // Tüm kategorileri getir
    getCategories() {
        console.log('[DatabaseService] Kategoriler alınıyor:', this.db.categories);
        return this.db.categories;
    }

    // Kategori ekle
    addCategory(category) {
        console.log('[DatabaseService] Kategori ekleniyor:', category);

        // ID oluştur
        const newId = this.db.categories.length > 0
            ? Math.max(...this.db.categories.map(c => c.id)) + 1
            : 1;

        // Yeni kategori
        const newCategory = {
            ...category,
            id: newId,
            productCount: 0,
            createdAt: new Date().toISOString()
        };

        // Kategoriler listesine ekle
        this.db.categories.push(newCategory);

        // Veritabanını kaydet
        this.db.lastUpdate = new Date().toISOString();
        this.saveDatabase();

        return newCategory;
    }

    // Kategori güncelle
    updateCategory(categoryId, updatedData) {
        console.log('[DatabaseService] Kategori güncelleniyor, ID:', categoryId, 'Veri:', updatedData);

        const categoryIndex = this.db.categories.findIndex(c => c.id === categoryId);

        if (categoryIndex >= 0) {
            // Kategoriyi güncelle
            this.db.categories[categoryIndex] = {
                ...this.db.categories[categoryIndex],
                ...updatedData,
                updatedAt: new Date().toISOString()
            };

            // Veritabanını kaydet
            this.db.lastUpdate = new Date().toISOString();
            this.saveDatabase();

            return this.db.categories[categoryIndex];
        }

        console.warn('[DatabaseService] Güncellenecek kategori bulunamadı');
        return null;
    }

    // Kategori sil
    deleteCategory(categoryId) {
        console.log('[DatabaseService] Kategori siliniyor, ID:', categoryId);

        const categoryIndex = this.db.categories.findIndex(c => c.id === categoryId);

        if (categoryIndex >= 0) {
            // Kategoriyi listeden kaldır
            this.db.categories.splice(categoryIndex, 1);

            // Veritabanını kaydet
            this.db.lastUpdate = new Date().toISOString();
            this.saveDatabase();

            return true;
        }

        console.warn('[DatabaseService] Silinecek kategori bulunamadı');
        return false;
    }
}

// Singleton örneği oluştur ve dışa aktar
const databaseService = new DatabaseService();
export default databaseService; 