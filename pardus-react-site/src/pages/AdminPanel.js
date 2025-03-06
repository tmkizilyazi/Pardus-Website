import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaFileUpload, FaImage, FaList, FaTag, FaCog, FaUserShield } from 'react-icons/fa';

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
    const [products, setProducts] = useState([
        { id: 1, name: 'Pardus Pro X9', price: 2499.99, category: 'Krampon', stock: 15, image: 'https://i.imgur.com/LRoQXhh.png' },
        { id: 2, name: 'Pardus Speed Elite', price: 1899.99, category: 'Krampon', stock: 23, image: 'https://i.imgur.com/QTtOnFh.png' },
        { id: 3, name: 'Pardus Urban Style', price: 1599.99, category: 'Sneakers', stock: 42, image: 'https://i.imgur.com/0jYvuDv.png' },
    ]);

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
                    <h3>Yeni Ürün Ekle</h3>
                    <Form>
                        <FormGroup>
                            <label>Ürün Adı</label>
                            <input type="text" placeholder="Ürün adını girin" />
                        </FormGroup>
                        <FormRow>
                            <FormGroup>
                                <label>Fiyat (₺)</label>
                                <input type="number" placeholder="0.00" min="0" step="0.01" />
                            </FormGroup>
                            <FormGroup>
                                <label>İndirimli Fiyat (₺)</label>
                                <input type="number" placeholder="0.00" min="0" step="0.01" />
                            </FormGroup>
                        </FormRow>
                        <FormRow>
                            <FormGroup>
                                <label>Kategori</label>
                                <select>
                                    <option value="">Kategori Seçin</option>
                                    <option value="Krampon">Krampon</option>
                                    <option value="Sneakers">Sneakers</option>
                                    <option value="Koşu">Koşu Ayakkabısı</option>
                                    <option value="Terlik">Terlik</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label>Stok Durumu</label>
                                <input type="number" placeholder="0" min="0" />
                            </FormGroup>
                        </FormRow>
                        <FormGroup>
                            <label>Renk Seçenekleri</label>
                            <ColorOptions>
                                <ColorPicker color="#000000" />
                                <ColorPicker color="#ff6b00" />
                                <ColorPicker color="#ffffff" />
                                <ColorPicker color="#0057ff" />
                                <AddColorButton>
                                    <FaPlus />
                                </AddColorButton>
                            </ColorOptions>
                        </FormGroup>
                        <FormGroup>
                            <label>Numara Seçenekleri</label>
                            <SizeOptions>
                                <SizeOption>36</SizeOption>
                                <SizeOption>37</SizeOption>
                                <SizeOption selected>38</SizeOption>
                                <SizeOption selected>39</SizeOption>
                                <SizeOption selected>40</SizeOption>
                                <SizeOption selected>41</SizeOption>
                                <SizeOption selected>42</SizeOption>
                                <SizeOption>43</SizeOption>
                                <SizeOption>44</SizeOption>
                                <SizeOption>45</SizeOption>
                            </SizeOptions>
                        </FormGroup>
                        <FormGroup>
                            <label>Ürün Açıklaması</label>
                            <textarea rows="4" placeholder="Ürün açıklamasını girin"></textarea>
                        </FormGroup>
                        <FormGroup>
                            <label>Ürün Görselleri</label>
                            <ImageUploader>
                                <ImagePreview>
                                    <FaImage />
                                    <p>Görsel Önizleme</p>
                                </ImagePreview>
                                <UploadButton>
                                    <FaFileUpload /> Görsel Yükle
                                </UploadButton>
                            </ImageUploader>
                        </FormGroup>
                        <FormActions>
                            <Button secondary onClick={() => setShowForm(false)}>
                                <FaTimes /> İptal
                            </Button>
                            <Button primary>
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
                            <TableCell>{product.price.toLocaleString('tr-TR')} ₺</TableCell>
                            <TableCell>{product.stock}</TableCell>
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

export default AdminPanel; 