import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaHeart, FaShare, FaCheck, FaShippingFast, FaUndo, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Örnek ürün verisi - Gerçek uygulamada API'den alınacak
  const product = {
    id: id || 1,
    name: 'Pardus Pro X9 Krampon',
    price: 2499.99,
    discount: 2999.99,
    rating: 4.9,
    reviews: 128,
    description: "Pardus Pro X9, profesyonel futbolcular için tasarlanmış üst düzey bir krampondur. Karbon fiber taban ve özel pençe tasarımlı çiviler sayesinde sahada rakiplerinizden bir adım önde olun. Pardus'un vahşi gücünü ayağınızda hissedin. Gelişmiş tutuş, üstün konfor ve pardus pençesi kadar güçlü yapı.",
    features: [
      'Karbon fiber taban',
      'Ultra hafif yapı (sadece 210g)',
      'Su geçirmez dış yüzey',
      'Pençe şeklinde çivi tasarımı',
      'Gelişmiş tutuş teknolojisi',
      'Anatomik iç taban',
      'Ayak bileği desteği'
    ],
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
      { id: 5, size: '42', available: true },
      { id: 6, size: '43', available: true },
      { id: 7, size: '44', available: false },
      { id: 8, size: '45', available: true }
    ],
    images: [
      '/PARDUS AYK.-1.png',
      '/PARDUS AYK.-1.png',
      '/PARDUS AYK.-1.png',
      '/PARDUS AYK.-1.png'
    ],
    category: 'Krampon',
    tags: ['Profesyonel', 'Çim Saha', 'Yarış', 'Futbol'],
    stock: 15
  };

  // State tanımlamaları
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Yıldız gösterimi için yardımcı fonksiyon
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" />);
    }

    return stars;
  };

  // Miktar değiştirme işleyicileri
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Sepete ekleme işleyicisi
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Lütfen bir numara seçin");
      return;
    }

    setIsAddingToCart(true);

    try {
      // Sepete ürün ekle
      console.log("Ürün sepete ekleniyor:", {
        product,
        size: selectedSize.size,
        color: selectedColor.code,
        quantity
      });

      addToCart(product, selectedSize.size, selectedColor.code, quantity);

      // Eklendiğini göster ve sıfırla
      setAddedToCart(true);
      setTimeout(() => {
        setIsAddingToCart(false);
        setAddedToCart(false);
      }, 2000);
    } catch (error) {
      console.error("Sepete eklerken hata:", error);
      setIsAddingToCart(false);
      alert("Sepete eklerken bir hata oluştu");
    }
  };

  // Geri butonu işleyicisi
  const handleGoBack = () => {
    navigate(-1);
  };

  // Hemen satın alma işleyicisi
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Lütfen bir numara seçin");
      return;
    }

    // Sepete ekle ve sepet sayfasına yönlendir
    addToCart(product, selectedSize.size, selectedColor.code, quantity);
    navigate('/sepet');
  };

  return (
    <ProductDetailWrapper>
      <Container>
        <GeriButton onClick={handleGoBack}>
          <FaArrowLeft /> Geri Dön
        </GeriButton>

        <Breadcrumbs>
          <BreadcrumbItem to="/">Ana Sayfa</BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem to="/koleksiyon-kesfet">Koleksiyon</BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem active>{product.name}</BreadcrumbItem>
        </Breadcrumbs>

        <ProductContent>
          <ProductGallery>
            <MainImageContainer>
              <motion.img
                src={mainImage}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {product.discount && (
                <DiscountBadge>
                  {Math.round(((product.discount - product.price) / product.discount) * 100)}%
                </DiscountBadge>
              )}
            </MainImageContainer>
            <ThumbnailsContainer>
              {product.images.map((image, index) => (
                <Thumbnail
                  key={index}
                  active={image === mainImage}
                  onClick={() => setMainImage(image)}
                >
                  <img src={image} alt={`${product.name} - Görsel ${index + 1}`} />
                </Thumbnail>
              ))}
            </ThumbnailsContainer>
          </ProductGallery>

          <ProductInfo>
            <ProductCategory>{product.category}</ProductCategory>
            <ProductName>{product.name}</ProductName>

            <RatingContainer>
              <Stars>{renderStars(product.rating)}</Stars>
              <ReviewCount>({product.reviews} Değerlendirme)</ReviewCount>
            </RatingContainer>

            <PriceContainer>
              <ProductPrice>{product.price.toLocaleString('tr-TR')} ₺</ProductPrice>
              {product.discount && (
                <OldPrice>{product.discount.toLocaleString('tr-TR')} ₺</OldPrice>
              )}
            </PriceContainer>

            <Divider />

            <OptionTitle>Renk Seçimi</OptionTitle>
            <ColorOptions>
              {product.colors.map(color => (
                <ColorOption
                  key={color.id}
                  color={color.code}
                  selected={selectedColor.id === color.id}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor.id === color.id && <FaCheck />}
                </ColorOption>
              ))}
            </ColorOptions>
            <SelectedOptionText>Seçilen Renk: <strong>{selectedColor.name}</strong></SelectedOptionText>

            <OptionTitle>Numara Seçimi</OptionTitle>
            <SizeOptions>
              {product.sizes.map(size => (
                <SizeOption
                  key={size.id}
                  selected={selectedSize?.id === size.id}
                  available={size.available}
                  onClick={() => size.available && setSelectedSize(size)}
                >
                  {size.size}
                </SizeOption>
              ))}
            </SizeOptions>
            <SelectedOptionText>
              {selectedSize
                ? `Seçilen Numara: ${selectedSize.size}`
                : <HataText>Lütfen bir numara seçin</HataText>}
            </SelectedOptionText>

            <Divider />

            <QuantityContainer>
              <OptionTitle>Adet</OptionTitle>
              <QuantityControl>
                <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
                <QuantityInput value={quantity} readOnly />
                <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
              </QuantityControl>
              <StockInfo>Stok Durumu: <strong>{product.stock} adet</strong></StockInfo>
            </QuantityContainer>

            <ActionButtons>
              <AddToCartButton
                disabled={!selectedSize || isAddingToCart}
                onClick={handleAddToCart}
                added={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <FaCheck />
                    <span>Sepete Eklendi</span>
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    <span>Sepete Ekle</span>
                  </>
                )}
              </AddToCartButton>
              <BuyNowButton
                disabled={!selectedSize}
                onClick={handleBuyNow}
              >
                Hemen Satın Al
              </BuyNowButton>
              <WishlistButton>
                <FaHeart />
              </WishlistButton>
              <ShareButton>
                <FaShare />
              </ShareButton>
            </ActionButtons>

            <BenefitsContainer>
              <Benefit>
                <FaShippingFast />
                <span>Hızlı Teslimat</span>
              </Benefit>
              <Benefit>
                <FaUndo />
                <span>15 Gün İade</span>
              </Benefit>
              <Benefit>
                <FaShieldAlt />
                <span>Güvenli Ödeme</span>
              </Benefit>
            </BenefitsContainer>
          </ProductInfo>
        </ProductContent>

        <ProductDetails>
          <DetailsTabs>
            <DetailsTab
              active={activeTab === 'description'}
              onClick={() => setActiveTab('description')}
            >
              Ürün Detayı
            </DetailsTab>
            <DetailsTab
              active={activeTab === 'features'}
              onClick={() => setActiveTab('features')}
            >
              Özellikler
            </DetailsTab>
            <DetailsTab
              active={activeTab === 'reviews'}
              onClick={() => setActiveTab('reviews')}
            >
              Değerlendirmeler ({product.reviews})
            </DetailsTab>
          </DetailsTabs>
          <DetailsContent>
            {activeTab === 'description' && (
              <Description>
                <p>{product.description}</p>
              </Description>
            )}
            {activeTab === 'features' && (
              <FeaturesList>
                {product.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <FeatureIcon>✓</FeatureIcon>
                    <span>{feature}</span>
                  </FeatureItem>
                ))}
              </FeaturesList>
            )}
            {activeTab === 'reviews' && (
              <ReviewsList>
                <ReviewMessage>
                  Bu ürün için {product.reviews} değerlendirme bulunmaktadır.
                </ReviewMessage>
                {/* Örnek değerlendirmeler buraya eklenebilir */}
              </ReviewsList>
            )}
          </DetailsContent>
        </ProductDetails>
      </Container>
    </ProductDetailWrapper>
  );
};

// =========== Stil Tanımlamaları ===========

const ProductDetailWrapper = styled.div`
  padding: 60px 0;
  background-color: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const GeriButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 15px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const BreadcrumbItem = styled(Link)`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  text-decoration: none;
  font-size: 14px;
  font-weight: ${props => props.active ? '500' : '400'};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.primary};
  }
`;

const BreadcrumbSeparator = styled.span`
  color: ${props => props.theme.colors.textLight};
  margin: 0 10px;
  font-size: 14px;
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProductGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainImageContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.small};
  background-color: ${props => props.theme.colors.backgroundAlt};
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
  
  @media (max-width: 992px) {
    height: 400px;
  }
  
  @media (max-width: 576px) {
    height: 300px;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.textDark};
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  z-index: 1;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: ${props => props.theme.transitions.default};
  margin-right: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProductInfo = styled.div``;

const ProductCategory = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const ProductName = styled.h1`
  font-size: 32px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
  font-weight: 700;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Stars = styled.div`
  display: flex;
  color: ${props => props.theme.colors.accent};
  font-size: 18px;
`;

const ReviewCount = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textLight};
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const OldPrice = styled.div`
  font-size: 18px;
  color: ${props => props.theme.colors.textLight};
  text-decoration: line-through;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin: 25px 0;
`;

const OptionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
`;

const ColorOption = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  background-color: ${props => props.color};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${props => props.theme.transitions.default};
  position: relative;
  
  &:hover {
    transform: scale(1.1);
  }
  
  svg {
    color: white;
    font-size: 14px;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
  }
`;

const SelectedOptionText = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 20px;
`;

const HataText = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 14px;
`;

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const SizeOption = styled.div`
  min-width: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.selected ? props.theme.colors.primary + '10' : 'transparent'};
  color: ${props => !props.available ? props.theme.colors.textLight : props.selected ? props.theme.colors.primary : props.theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  transition: ${props => props.theme.transitions.default};
  opacity: ${props => props.available ? 1 : 0.5};
  
  &:hover {
    background-color: ${props => props.available && !props.selected ? props.theme.colors.backgroundAlt : ''};
    border-color: ${props => props.available && !props.selected ? props.theme.colors.primary : ''};
  }
`;

const QuantityContainer = styled.div`
  margin-bottom: 30px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  max-width: 140px;
  margin-bottom: 15px;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  font-size: 18px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid ${props => props.theme.colors.border};
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  background-color: white;
`;

const StockInfo = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textLight};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  height: 50px;
  background-color: ${props => props.disabled ? '#aaa' : props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.disabled ? '#aaa' : props.theme.colors.secondary};
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px)'};
  }
  
  @media (max-width: 768px) {
    flex: 1 0 100%;
  }
`;

const BuyNowButton = styled.button`
  flex: 1;
  height: 50px;
  background-color: ${props => props.disabled ? '#aaa' : '#1A2A3A'};
  color: white;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.disabled ? '#aaa' : '#0D1520'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px)'};
  }
  
  @media (max-width: 768px) {
    flex: 1 0 100%;
    order: 3;
  }
`;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const WishlistButton = styled(IconButton)``;
const ShareButton = styled(IconButton)``;

const BenefitsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: 8px;
  padding: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${props => props.theme.colors.text};
  
  svg {
    font-size: 24px;
    color: ${props => props.theme.colors.primary};
  }
`;

const ProductDetails = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.small};
  overflow: hidden;
  margin-bottom: 60px;
`;

const DetailsTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  @media (max-width: 768px) {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const DetailsTab = styled.div`
  padding: 15px 25px;
  font-weight: 600;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const DetailsContent = styled.div`
  padding: 30px;
  
  @media (max-width: 576px) {
    padding: 20px 15px;
  }
`;

const Description = styled.div`
  p {
    line-height: 1.8;
    color: ${props => props.theme.colors.text};
    margin-bottom: 15px;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const FeatureIcon = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
`;

const ReviewsList = styled.div``;

const ReviewMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  padding: 20px 0;
`;

const ButtonView = styled.button`
  padding: 12px 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

export default ProductDetail; 