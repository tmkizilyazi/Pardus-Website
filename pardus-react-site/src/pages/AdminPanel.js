import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaFileUpload, FaImage, FaList, FaTag, FaCog, FaUserShield, FaShoppingCart, FaEye, FaCheckCircle, FaTimesCircle, FaBoxOpen, FaTruck, FaMoneyBillWave } from 'react-icons/fa';
import databaseService from '../services/DatabaseService';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('products');

    return (
        <AdminPanelWrapper>
            <Container>
                <PanelHeader>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Pardus Sportswear Admin Paneli
                    </motion.h1>
                    <AdminInfo>
                        <AdminAvatar>
                            <FaUserShield />
                        </AdminAvatar>
                        <span>Hoş geldiniz, Admin</span>
                    </AdminInfo>
                </PanelHeader>

                <PanelContent>
                    <SideNav>
                        <NavItem
                            active={activeTab === 'products'}
                            onClick={() => setActiveTab('products')}
                        >
                            <FaList /> <span>Ürün Yönetimi</span>
                        </NavItem>
                        <NavItem
                            active={activeTab === 'orders'}
                            onClick={() => setActiveTab('orders')}
                        >
                            <FaShoppingCart /> <span>Siparişler</span>
                        </NavItem>
                        <NavItem
                            active={activeTab === 'categories'}
                            onClick={() => setActiveTab('categories')}
                        >
                            <FaTag /> <span>Kategori Yönetimi</span>
                        </NavItem>
                        <NavItem
                            active={activeTab === 'settings'}
                            onClick={() => setActiveTab('settings')}
                        >
                            <FaCog /> <span>Ayarlar</span>
                        </NavItem>
                    </SideNav>

                    <MainContent>
                        {activeTab === 'products' && <ProductsTab />}
                        {activeTab === 'orders' && <OrdersTab />}
                        {activeTab === 'categories' && <CategoriesTab />}
                        {activeTab === 'settings' && <SettingsTab />}
                    </MainContent>
                </PanelContent>
            </Container>
        </AdminPanelWrapper>
    );
};

// Ürünler Sekmesi
const ProductsTab = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discount: '',
        category: '',
        subCategory: '',
        description: '',
        stock: 0,
        colors: [],
        sizes: [],
        isNew: true,
        features: [],
        image: '/PARDUS AYK.-1.png', // Varsayılan görsel
        images: ['/PARDUS AYK.-1.png'],
    });

    // Form değişikliklerini izle
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Numara seçimini güncelle
    const toggleSize = (size) => {
        setFormData(prev => {
            const currentSizes = prev.sizes || [];
            const existingSize = currentSizes.find(s => s.size === size);

            let newSizes;
            if (existingSize) {
                // Varsa değerini değiştir
                newSizes = currentSizes.map(s =>
                    s.size === size ? { ...s, available: !s.available } : s
                );
            } else {
                // Yoksa ekle
                newSizes = [...currentSizes, { size, available: true, id: Date.now() }];
            }

            return { ...prev, sizes: newSizes };
        });
    };

    // Renk ekle
    const addColor = (color) => {
        if (!color || color === '#000000') return;

        setFormData(prev => {
            const currentColors = prev.colors || [];
            // Aynı renkli varsa ekleme
            if (currentColors.some(c => c.code === color)) return prev;

            return {
                ...prev,
                colors: [...currentColors, { id: Date.now(), code: color, name: getColorName(color) }]
            };
        });
    };

    // Renk isimlerini belirle
    const getColorName = (colorCode) => {
        const colors = {
            '#000000': 'Siyah',
            '#FFFFFF': 'Beyaz',
            '#FF0000': 'Kırmızı',
            '#0000FF': 'Mavi',
            '#FFFF00': 'Sarı',
            '#00FF00': 'Yeşil',
            '#FF6B00': 'Turuncu',
            '#0057FF': 'Mavi',
            '#FFD700': 'Altın',
        };

        return colors[colorCode.toUpperCase()] || 'Renk';
    };

    // Özellik ekleme
    const addFeature = (feature) => {
        if (!feature) return;

        setFormData(prev => ({
            ...prev,
            features: [...(prev.features || []), feature]
        }));
    };

    // Form gönderme
    const handleSubmit = (e) => {
        e.preventDefault();

        // Form verilerini hazırla
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            discount: formData.discount ? parseFloat(formData.discount) : null,
            stock: parseInt(formData.stock),
        };

        if (editingProduct) {
            // Ürün güncelleme
            databaseService.updateProduct(editingProduct.id, productData);
        } else {
            // Yeni ürün ekleme
            databaseService.addProduct(productData);
        }

        // Formu temizle ve kapat
        resetForm();
        // Ürün listesini yenile
        loadProducts();
    };

    // Ürünü düzenleme moduna al
    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || '',
            price: product.price || '',
            discount: product.discount || '',
            category: product.category || '',
            subCategory: product.subCategory || '',
            description: product.description || '',
            stock: product.stock || 0,
            colors: product.colors || [],
            sizes: product.sizes || [],
            isNew: product.isNew || false,
            features: product.features || [],
            image: product.image || '',
            images: product.images || [],
        });
        setShowForm(true);
    };

    // Ürün silme
    const handleDelete = (productId) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            databaseService.deleteProduct(productId);
            loadProducts();
        }
    };

    // Formu temizle
    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            discount: '',
            category: '',
            subCategory: '',
            description: '',
            stock: 0,
            colors: [],
            sizes: [],
            isNew: true,
            features: [],
            image: '/PARDUS AYK.-1.png',
            images: ['/PARDUS AYK.-1.png'],
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    // Ürünleri yükle
    const loadProducts = () => {
        const allProducts = databaseService.getProducts();
        setProducts(allProducts);
    };

    // Component yüklendiğinde ürünleri getir
    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <TabContainer>
            <TabHeader>
                <h2>Ürün Yönetimi</h2>
                <Button primary onClick={() => setShowForm(!showForm)}>
                    {showForm ? <><FaTimes /> İptal</> : <><FaPlus /> Yeni Ürün</>}
                </Button>
            </TabHeader>

            {showForm && (
                <FormPanel>
                    <h3>{editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h3>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <label>Ürün Adı</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ürün adını girin"
                                required
                            />
                        </FormGroup>
                        <FormRow>
                            <FormGroup>
                                <label>Fiyat (₺)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>İndirimli Fiyat (₺)</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup>
                                <label>Kategori</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Kategori Seçin</option>
                                    <option value="Krampon">Krampon</option>
                                    <option value="Sneakers">Sneakers</option>
                                    <option value="Koşu Ayakkabısı">Koşu Ayakkabısı</option>
                                    <option value="Terlik">Terlik</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label>Alt Kategori</label>
                                <input
                                    type="text"
                                    name="subCategory"
                                    value={formData.subCategory}
                                    onChange={handleChange}
                                    placeholder="Alt kategori"
                                />
                            </FormGroup>
                        </FormRow>
                        <FormGroup>
                            <label>Stok Durumu</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Renk Seçenekleri</label>
                            <ColorOptions>
                                {formData.colors.map(color => (
                                    <ColorItem key={color.id}>
                                        <ColorPicker color={color.code} />
                                        <span>{color.name}</span>
                                        <RemoveButton
                                            onClick={() => setFormData(prev => ({
                                                ...prev,
                                                colors: prev.colors.filter(c => c.id !== color.id)
                                            }))}
                                        >
                                            <FaTimes />
                                        </RemoveButton>
                                    </ColorItem>
                                ))}
                                <AddColorButton onClick={() => {
                                    const color = prompt('Renk kodunu girin (örn: #FF0000):');
                                    if (color) addColor(color);
                                }}>
                                    <FaPlus />
                                </AddColorButton>
                            </ColorOptions>
                        </FormGroup>
                        <FormGroup>
                            <label>Numara Seçenekleri</label>
                            <SizeOptions>
                                {['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'].map(size => {
                                    const isSelected = formData.sizes.some(
                                        s => s.size === size && s.available
                                    );
                                    return (
                                        <SizeOption
                                            key={size}
                                            selected={isSelected}
                                            onClick={() => toggleSize(size)}
                                        >
                                            {size}
                                        </SizeOption>
                                    );
                                })}
                            </SizeOptions>
                        </FormGroup>
                        <FormGroup>
                            <label>Ürün Açıklaması</label>
                            <textarea
                                rows="4"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Ürün açıklamasını girin"
                                required
                            ></textarea>
                        </FormGroup>
                        <FormGroup>
                            <label>Ürün Özellikleri</label>
                            <FeatureList>
                                {formData.features.map((feature, index) => (
                                    <FeatureItem key={index}>
                                        <span>{feature}</span>
                                        <RemoveButton
                                            onClick={() => setFormData(prev => ({
                                                ...prev,
                                                features: prev.features.filter((_, i) => i !== index)
                                            }))}
                                        >
                                            <FaTimes />
                                        </RemoveButton>
                                    </FeatureItem>
                                ))}
                                <AddFeatureButton onClick={() => {
                                    const feature = prompt('Ürün özelliği ekleyin:');
                                    if (feature) addFeature(feature);
                                }}>
                                    <FaPlus /> Özellik Ekle
                                </AddFeatureButton>
                            </FeatureList>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                <input
                                    type="checkbox"
                                    name="isNew"
                                    checked={formData.isNew}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        isNew: e.target.checked
                                    }))}
                                />
                                Yeni Ürün
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>Ürün Görselleri</label>
                            <ImageUploader>
                                <ImagePreview>
                                    {formData.image ? (
                                        <img
                                            src={formData.image}
                                            alt="Ürün Görseli"
                                            style={{ maxWidth: '100%', maxHeight: '150px' }}
                                        />
                                    ) : (
                                        <>
                                            <FaImage />
                                            <p>Görsel Önizleme</p>
                                        </>
                                    )}
                                </ImagePreview>
                                <UploadButton>
                                    <FaFileUpload /> Görsel Yükle
                                </UploadButton>
                            </ImageUploader>
                        </FormGroup>
                        <FormActions>
                            <Button secondary onClick={resetForm}>
                                <FaTimes /> İptal
                            </Button>
                            <Button primary type="submit">
                                <FaSave /> Kaydet
                            </Button>
                        </FormActions>
                    </Form>
                </FormPanel>
            )}

            <DataTable>
                <TableHeader>
                    <TableRow>
                        <TableCell header>Ürün Resmi</TableCell>
                        <TableCell header>Ürün Adı</TableCell>
                        <TableCell header>Kategori</TableCell>
                        <TableCell header>Fiyat</TableCell>
                        <TableCell header>Stok</TableCell>
                        <TableCell header>İşlemler</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <ProductImage src={product.image} alt={product.name} />
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                                {product.price.toLocaleString('tr-TR')} ₺
                                {product.discount && (
                                    <DiscountPrice>{product.discount.toLocaleString('tr-TR')} ₺</DiscountPrice>
                                )}
                            </TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>
                                <ActionButtons>
                                    <ActionButton primary onClick={() => handleEdit(product)}>
                                        <FaEdit />
                                    </ActionButton>
                                    <ActionButton danger onClick={() => handleDelete(product.id)}>
                                        <FaTrash />
                                    </ActionButton>
                                </ActionButtons>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </DataTable>
        </TabContainer>
    );
};

// Yeni Siparişler Sekmesi
const OrdersTab = () => {
    const [orderDetailId, setOrderDetailId] = useState(null);
    const [orders, setOrders] = useState([
        {
            id: 'ORD-2023-001',
            customer: 'Ahmet Yılmaz',
            date: '2023-06-15',
            total: 2499.99,
            status: 'completed',
            paymentMethod: 'Kredi Kartı',
            items: [
                { id: 1, name: 'Pardus Pro X9', price: 2499.99, quantity: 1, size: '42', color: '#000000' }
            ],
            shippingAddress: {
                fullName: 'Ahmet Yılmaz',
                address: 'Atatürk Cad. No:123',
                city: 'İstanbul',
                zipCode: '34000',
                country: 'Türkiye',
                phone: '05551234567'
            }
        },
        {
            id: 'ORD-2023-002',
            customer: 'Zeynep Kaya',
            date: '2023-06-16',
            total: 3799.98,
            status: 'processing',
            paymentMethod: 'Havale/EFT',
            items: [
                { id: 2, name: 'Pardus Speed Elite', price: 1899.99, quantity: 2, size: '40', color: '#ff6b00' }
            ],
            shippingAddress: {
                fullName: 'Zeynep Kaya',
                address: 'Cumhuriyet Mah. 1453 Sok. No:7',
                city: 'Ankara',
                zipCode: '06000',
                country: 'Türkiye',
                phone: '05339876543'
            }
        },
        {
            id: 'ORD-2023-003',
            customer: 'Burak Demir',
            date: '2023-06-17',
            total: 1599.99,
            status: 'shipped',
            paymentMethod: 'Kredi Kartı',
            items: [
                { id: 3, name: 'Pardus Urban Style', price: 1599.99, quantity: 1, size: '43', color: '#000000' }
            ],
            shippingAddress: {
                fullName: 'Burak Demir',
                address: 'Bağdat Cad. No:42',
                city: 'İzmir',
                zipCode: '35000',
                country: 'Türkiye',
                phone: '05441122334'
            }
        },
        {
            id: 'ORD-2023-004',
            customer: 'Ayşe Şahin',
            date: '2023-06-18',
            total: 4099.98,
            status: 'pending',
            paymentMethod: 'Kapıda Ödeme',
            items: [
                { id: 1, name: 'Pardus Pro X9', price: 2499.99, quantity: 1, size: '38', color: '#0057ff' },
                { id: 3, name: 'Pardus Urban Style', price: 1599.99, quantity: 1, size: '38', color: '#000000' }
            ],
            shippingAddress: {
                fullName: 'Ayşe Şahin',
                address: 'Büyükdere Cad. No:85',
                city: 'İstanbul',
                zipCode: '34000',
                country: 'Türkiye',
                phone: '05325556677'
            }
        }
    ]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <FaTimesCircle style={{ color: '#ffb700' }} />;
            case 'processing': return <FaMoneyBillWave style={{ color: '#0088ff' }} />;
            case 'shipped': return <FaTruck style={{ color: '#00aaff' }} />;
            case 'completed': return <FaCheckCircle style={{ color: '#00cc66' }} />;
            default: return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Bekliyor';
            case 'processing': return 'İşleniyor';
            case 'shipped': return 'Kargoda';
            case 'completed': return 'Tamamlandı';
            default: return status;
        }
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId
                ? { ...order, status: newStatus }
                : order
        ));
    };

    return (
        <TabContainer>
            <TabHeader>
                <h2>Sipariş Yönetimi</h2>
                <OrderStatsContainer>
                    <OrderStat>
                        <OrderStatIcon className="pending">
                            <FaTimesCircle />
                        </OrderStatIcon>
                        <OrderStatInfo>
                            <OrderStatCount>1</OrderStatCount>
                            <OrderStatLabel>Bekleyen</OrderStatLabel>
                        </OrderStatInfo>
                    </OrderStat>
                    <OrderStat>
                        <OrderStatIcon className="processing">
                            <FaMoneyBillWave />
                        </OrderStatIcon>
                        <OrderStatInfo>
                            <OrderStatCount>1</OrderStatCount>
                            <OrderStatLabel>İşlenen</OrderStatLabel>
                        </OrderStatInfo>
                    </OrderStat>
                    <OrderStat>
                        <OrderStatIcon className="shipped">
                            <FaTruck />
                        </OrderStatIcon>
                        <OrderStatInfo>
                            <OrderStatCount>1</OrderStatCount>
                            <OrderStatLabel>Kargoda</OrderStatLabel>
                        </OrderStatInfo>
                    </OrderStat>
                    <OrderStat>
                        <OrderStatIcon className="completed">
                            <FaCheckCircle />
                        </OrderStatIcon>
                        <OrderStatInfo>
                            <OrderStatCount>1</OrderStatCount>
                            <OrderStatLabel>Tamamlanan</OrderStatLabel>
                        </OrderStatInfo>
                    </OrderStat>
                </OrderStatsContainer>
            </TabHeader>

            {orderDetailId ? (
                <OrderDetailPanel>
                    {(() => {
                        const order = orders.find(o => o.id === orderDetailId);
                        return (
                            <>
                                <OrderDetailHeader>
                                    <h3>Sipariş Detayı #{order.id}</h3>
                                    <Button secondary onClick={() => setOrderDetailId(null)}>
                                        <FaTimes /> Kapat
                                    </Button>
                                </OrderDetailHeader>

                                <OrderDetailGrid>
                                    <OrderDetailSection>
                                        <h4>Müşteri Bilgileri</h4>
                                        <DetailItem>
                                            <DetailLabel>Müşteri:</DetailLabel>
                                            <DetailValue>{order.customer}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Sipariş Tarihi:</DetailLabel>
                                            <DetailValue>{order.date}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Ödeme Yöntemi:</DetailLabel>
                                            <DetailValue>{order.paymentMethod}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Toplam Tutar:</DetailLabel>
                                            <DetailValue className="price">{order.total.toLocaleString('tr-TR')} ₺</DetailValue>
                                        </DetailItem>
                                    </OrderDetailSection>

                                    <OrderDetailSection>
                                        <h4>Teslimat Adresi</h4>
                                        <DetailItem>
                                            <DetailLabel>Ad Soyad:</DetailLabel>
                                            <DetailValue>{order.shippingAddress.fullName}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Adres:</DetailLabel>
                                            <DetailValue>{order.shippingAddress.address}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Şehir/Posta Kodu:</DetailLabel>
                                            <DetailValue>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Telefon:</DetailLabel>
                                            <DetailValue>{order.shippingAddress.phone}</DetailValue>
                                        </DetailItem>
                                    </OrderDetailSection>

                                    <OrderDetailSection className="full-width">
                                        <h4>Sipariş Durumu</h4>
                                        <OrderStatusActions>
                                            <StatusButton
                                                className={order.status === 'pending' ? 'active' : ''}
                                                onClick={() => updateOrderStatus(order.id, 'pending')}
                                            >
                                                <FaTimesCircle /> Bekliyor
                                            </StatusButton>
                                            <StatusButton
                                                className={order.status === 'processing' ? 'active' : ''}
                                                onClick={() => updateOrderStatus(order.id, 'processing')}
                                            >
                                                <FaMoneyBillWave /> İşleniyor
                                            </StatusButton>
                                            <StatusButton
                                                className={order.status === 'shipped' ? 'active' : ''}
                                                onClick={() => updateOrderStatus(order.id, 'shipped')}
                                            >
                                                <FaTruck /> Kargoda
                                            </StatusButton>
                                            <StatusButton
                                                className={order.status === 'completed' ? 'active' : ''}
                                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                            >
                                                <FaCheckCircle /> Tamamlandı
                                            </StatusButton>
                                        </OrderStatusActions>
                                    </OrderDetailSection>

                                    <OrderDetailSection className="full-width">
                                        <h4>Sipariş Ürünleri</h4>
                                        <OrderItemsTable>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableCell header>Ürün</TableCell>
                                                    <TableCell header>Adet</TableCell>
                                                    <TableCell header>Beden</TableCell>
                                                    <TableCell header>Renk</TableCell>
                                                    <TableCell header>Birim Fiyat</TableCell>
                                                    <TableCell header>Toplam</TableCell>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {order.items.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell>{item.size}</TableCell>
                                                        <TableCell>
                                                            <ColorSwatch color={item.color} />
                                                        </TableCell>
                                                        <TableCell>{item.price.toLocaleString('tr-TR')} ₺</TableCell>
                                                        <TableCell>{(item.price * item.quantity).toLocaleString('tr-TR')} ₺</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan="5" align="right">
                                                        <strong>Genel Toplam:</strong>
                                                    </TableCell>
                                                    <TableCell>
                                                        <strong>{order.total.toLocaleString('tr-TR')} ₺</strong>
                                                    </TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </OrderItemsTable>
                                    </OrderDetailSection>
                                </OrderDetailGrid>
                            </>
                        );
                    })()}
                </OrderDetailPanel>
            ) : (
                <DataTable>
                    <TableHeader>
                        <TableRow>
                            <TableCell header>Sipariş No</TableCell>
                            <TableCell header>Müşteri</TableCell>
                            <TableCell header>Tarih</TableCell>
                            <TableCell header>Tutar</TableCell>
                            <TableCell header>Durum</TableCell>
                            <TableCell header>İşlemler</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell><strong>{order.id}</strong></TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.total.toLocaleString('tr-TR')} ₺</TableCell>
                                <TableCell>
                                    <OrderStatus status={order.status}>
                                        {getStatusIcon(order.status)} {getStatusText(order.status)}
                                    </OrderStatus>
                                </TableCell>
                                <TableCell>
                                    <ActionButtons>
                                        <ActionButton primary onClick={() => setOrderDetailId(order.id)}>
                                            <FaEye />
                                        </ActionButton>
                                    </ActionButtons>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </DataTable>
            )}
        </TabContainer>
    );
};

// Kategoriler Sekmesi
const CategoriesTab = () => {
    const categories = [
        { id: 1, name: 'Krampon', productCount: 12, featured: true },
        { id: 2, name: 'Sneakers', productCount: 8, featured: true },
        { id: 3, name: 'Koşu Ayakkabısı', productCount: 5, featured: false },
        { id: 4, name: 'Terlik', productCount: 3, featured: false },
    ];

    return (
        <TabContainer>
            <TabHeader>
                <h2>Kategori Yönetimi</h2>
                <Button primary>
                    <FaPlus /> Yeni Kategori
                </Button>
            </TabHeader>

            <DataTable>
                <TableHeader>
                    <TableRow>
                        <TableCell header>Kategori Adı</TableCell>
                        <TableCell header>Ürün Sayısı</TableCell>
                        <TableCell header>Öne Çıkan</TableCell>
                        <TableCell header>İşlemler</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.productCount}</TableCell>
                            <TableCell>
                                <CategoryFeatured featured={category.featured}>
                                    {category.featured ? 'Evet' : 'Hayır'}
                                </CategoryFeatured>
                            </TableCell>
                            <TableCell>
                                <ActionButtons>
                                    <ActionButton primary>
                                        <FaEdit />
                                    </ActionButton>
                                    <ActionButton danger>
                                        <FaTrash />
                                    </ActionButton>
                                </ActionButtons>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </DataTable>
        </TabContainer>
    );
};

// Ayarlar Sekmesi
const SettingsTab = () => {
    return (
        <TabContainer>
            <TabHeader>
                <h2>Site Ayarları</h2>
                <Button primary>
                    <FaSave /> Kaydet
                </Button>
            </TabHeader>

            <SettingsPanel>
                <SettingsGroup>
                    <h3>Genel Ayarlar</h3>
                    <FormGroup>
                        <label>Site Adı</label>
                        <input type="text" value="Pardus Sportswear" />
                    </FormGroup>
                    <FormGroup>
                        <label>Slogan</label>
                        <input type="text" value="Sahalarda Pardus İzini Bırak" />
                    </FormGroup>
                    <FormGroup>
                        <label>İletişim Email</label>
                        <input type="email" value="info@pardussport.com" />
                    </FormGroup>
                    <FormGroup>
                        <label>İletişim Telefon</label>
                        <input type="text" value="+90 (212) 555 1234" />
                    </FormGroup>
                </SettingsGroup>

                <SettingsGroup>
                    <h3>Ödeme Ayarları</h3>
                    <FormGroup>
                        <label>Para Birimi</label>
                        <select>
                            <option value="TL">Türk Lirası (₺)</option>
                            <option value="USD">Amerikan Doları ($)</option>
                            <option value="EUR">Euro (€)</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>KDV Oranı (%)</label>
                        <input type="number" value="18" min="0" max="100" />
                    </FormGroup>
                    <FormGroup>
                        <label>Ücretsiz Kargo Limiti (₺)</label>
                        <input type="number" value="500" min="0" />
                    </FormGroup>
                </SettingsGroup>

                <SettingsGroup>
                    <h3>Sosyal Medya Bağlantıları</h3>
                    <FormGroup>
                        <label>Instagram</label>
                        <input type="text" value="https://instagram.com/pardus_sportswear" />
                    </FormGroup>
                    <FormGroup>
                        <label>Facebook</label>
                        <input type="text" value="https://facebook.com/pardussportswear" />
                    </FormGroup>
                    <FormGroup>
                        <label>Twitter</label>
                        <input type="text" value="https://twitter.com/pardus_sport" />
                    </FormGroup>
                </SettingsGroup>
            </SettingsPanel>
        </TabContainer>
    );
};

// Styled Components
const AdminPanelWrapper = styled.div`
  padding: 100px 0;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Container = styled.div`
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 28px;
    color: ${props => props.theme.colors.secondary};
  }
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
`;

const AdminAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const PanelContent = styled.div`
  display: flex;
  gap: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
`;

const SideNav = styled.div`
  width: 250px;
  background-color: ${props => props.theme.colors.secondary};
  padding: 30px 0;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  color: ${props => props.active ? props.theme.colors.primary : 'white'};
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-left: 4px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow: auto;
`;

const TabContainer = styled.div``;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    font-size: 22px;
    color: ${props => props.theme.colors.secondary};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  background-color: ${props =>
        props.primary ? props.theme.colors.primary :
            props.secondary ? '#6c757d' :
                props.danger ? '#dc3545' :
                    '#f8f9fa'};
  color: ${props =>
        (props.primary || props.secondary || props.danger) ? 'white' :
            props.theme.colors.secondary};
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const FormPanel = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid ${props => props.theme.colors.grey};
  
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    color: ${props => props.theme.colors.secondary};
  }
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: ${props => props.theme.colors.secondary};
  }
  
  input, select, textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${props => props.theme.colors.grey};
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  ${FormGroup} {
    flex: 1;
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 10px;
`;

const ColorPicker = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.theme.colors.grey};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    transform: scale(1.1);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const AddColorButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: 2px solid ${props => props.theme.colors.grey};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SizeOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => props.selected ? props.theme.colors.primary : '#f0f0f0'};
  color: ${props => props.selected ? 'white' : props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  font-weight: 600;
  
  &:hover {
    background-color: ${props => props.selected ? props.theme.colors.primary : '#e0e0e0'};
  }
`;

const ImageUploader = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ImagePreview = styled.div`
  width: 120px;
  height: 120px;
  border: 2px dashed ${props => props.theme.colors.grey};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.darkGrey};
  
  svg {
    font-size: 32px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 12px;
  }
`;

const UploadButton = styled.button`
  padding: 10px 16px;
  background-color: #f0f0f0;
  color: ${props => props.theme.colors.secondary};
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f0f0f0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  text-align: ${props => props.header ? 'left' : 'left'};
  font-weight: ${props => props.header ? '600' : '400'};
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  background-color: ${props =>
        props.primary ? props.theme.colors.primary :
            props.danger ? '#dc3545' :
                '#f8f9fa'};
  color: white;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const CategoryFeatured = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => props.featured ? '#28a745' : '#6c757d'};
  color: white;
`;

const SettingsPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const SettingsGroup = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid ${props => props.theme.colors.grey};
  
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    color: ${props => props.theme.colors.secondary};
    padding-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.colors.grey};
  }
`;

// Sipariş sekmesi stilleri
const OrderStatsContainer = styled.div`
    display: flex;
    gap: 20px;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        flex-wrap: wrap;
        gap: 10px;
    }
`;

const OrderStat = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: ${props => props.theme.shadows.small};
    transition: ${props => props.theme.transitions.default};
    
    &:hover {
        transform: translateY(-3px);
        box-shadow: ${props => props.theme.shadows.medium};
    }
`;

const OrderStatIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    
    &.pending {
        background-color: rgba(255, 183, 0, 0.1);
        color: #ffb700;
    }
    
    &.processing {
        background-color: rgba(0, 136, 255, 0.1);
        color: #0088ff;
    }
    
    &.shipped {
        background-color: rgba(0, 170, 255, 0.1);
        color: #00aaff;
    }
    
    &.completed {
        background-color: rgba(0, 204, 102, 0.1);
        color: #00cc66;
    }
`;

const OrderStatInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const OrderStatCount = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.theme.colors.text};
`;

const OrderStatLabel = styled.div`
    font-size: 13px;
    color: ${props => props.theme.colors.textLight};
`;

const OrderStatus = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    
    ${props => {
        switch (props.status) {
            case 'pending':
                return `
                    background-color: rgba(255, 183, 0, 0.1);
                    color: #ffb700;
                `;
            case 'processing':
                return `
                    background-color: rgba(0, 136, 255, 0.1);
                    color: #0088ff;
                `;
            case 'shipped':
                return `
                    background-color: rgba(0, 170, 255, 0.1);
                    color: #00aaff;
                `;
            case 'completed':
                return `
                    background-color: rgba(0, 204, 102, 0.1);
                    color: #00cc66;
                `;
            default:
                return `
                    background-color: rgba(150, 150, 150, 0.1);
                    color: #969696;
                `;
        }
    }}
`;

const OrderDetailPanel = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: ${props => props.theme.shadows.small};
`;

const OrderDetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    
    h3 {
        font-size: 20px;
        font-weight: 600;
        color: ${props => props.theme.colors.text};
        margin: 0;
    }
`;

const OrderDetailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        grid-template-columns: 1fr;
    }
    
    .full-width {
        grid-column: 1 / -1;
    }
`;

const OrderDetailSection = styled.div`
    h4 {
        font-size: 16px;
        font-weight: 600;
        color: ${props => props.theme.colors.textLight};
        margin: 0 0 15px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid ${props => props.theme.colors.border};
    }
`;

const DetailItem = styled.div`
    display: flex;
    margin-bottom: 10px;
    
    &:last-child {
        margin-bottom: 0;
    }
    
    .price {
        font-weight: 600;
        color: ${props => props.theme.colors.primary};
    }
`;

const DetailLabel = styled.div`
    width: 120px;
    font-weight: 500;
    color: ${props => props.theme.colors.textLight};
`;

const DetailValue = styled.div`
    flex: 1;
    color: ${props => props.theme.colors.text};
`;

const OrderStatusActions = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
`;

const StatusButton = styled.button`
    padding: 10px 15px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background-color: #f4f6f8;
    color: ${props => props.theme.colors.textLight};
    border: 1px solid ${props => props.theme.colors.border};
    
    &:hover {
        background-color: #e9ecef;
    }
    
    &.active {
        background-color: ${props => props.theme.colors.primary};
        color: white;
        border-color: ${props => props.theme.colors.primary};
    }
`;

const OrderItemsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    border: 1px solid ${props => props.theme.colors.border};
    
    th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid ${props => props.theme.colors.border};
    }
    
    th {
        background-color: #f4f6f8;
        font-weight: 600;
        color: ${props => props.theme.colors.textLight};
    }
`;

const TableFooter = styled.tfoot`
    background-color: #f9f9f9;
    
    td {
        padding: 12px 15px;
        color: ${props => props.theme.colors.text};
    }
`;

const ColorSwatch = styled.span`
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid ${props => props.theme.colors.border};
`;

const ColorItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 8px;
    
    span {
        margin: 0 5px;
        font-size: 12px;
    }
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme.colors.danger};
    cursor: pointer;
    font-size: 12px;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        color: ${props => props.theme.colors.dangerDark};
    }
`;

const FeatureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const FeatureItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background-color: ${props => props.theme.colors.backgroundLight};
    border-radius: 4px;
`;

const AddFeatureButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: ${props => props.theme.colors.backgroundDark};
    color: ${props => props.theme.colors.textLight};
    border: 1px dashed ${props => props.theme.colors.border};
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    margin-top: 8px;
    
    &:hover {
        background-color: ${props => props.theme.colors.background};
    }
`;

const DiscountPrice = styled.span`
    display: block;
    text-decoration: line-through;
    color: ${props => props.theme.colors.textLight};
    font-size: 12px;
`;

export default AdminPanel; 