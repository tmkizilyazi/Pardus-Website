import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaHeart, FaShare, FaCheck, FaShippingFast, FaUndo, FaShieldAlt } from 'react-icons/fa';

const ProductDetail = () => {
    // Örnek ürün verisi
    const product = {
        id: 1,
        name: 'Pardus Pro X9 Krampon',
        price: 2499.99,
        discount: 2999.99,
        rating: 4.9,
        reviews: 128,
        description: 'Pardus Pro X9, profesyonel futbolcular için tasarlanmış üst düzey bir krampondur. Karbon fiber taban ve hafif malzemeler sayesinde sahada rakiplerinizden bir adım önde olun. Gelişmiş tutuş, üstün konfor ve pençe gibi güçlü.',
        features: [
            'Karbon fiber taban',
            'Ultra hafif yapı (sadece 210g)',
            'Su geçirmez dış yüzey',
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
            'https://i.imgur.com/LRoQXhh.png',
            'https://i.imgur.com/QTtOnFh.png',
            'https://i.imgur.com/0jYvuDv.png',
            'https://i.imgur.com/UVEjFKZ.png'
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
    const [showFullDescription, setShowFullDescription] = useState(false);

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

    return (
        <ProductDetailWrapper>
            <Container>
                <Breadcrumbs>
                    <BreadcrumbItem to="/">Ana Sayfa</BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbItem to="/kramponlar">Kramponlar</BreadcrumbItem>
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
                                : 'Lütfen bir numara seçin'}
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
                            <AddToCartButton disabled={!selectedSize}>
                                <FaShoppingCart />
                                <span>Sepete Ekle</span>
                            </AddToCartButton>
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
                                <span>30 Gün İade</span>
                            </Benefit>
                            <Benefit>
                                <FaShieldAlt />
                                <span>2 Yıl Garanti</span>
                            </Benefit>
                        </BenefitsContainer>
                    </ProductInfo>
                </ProductContent>

                <ProductDetails>
                    <DetailsTabs>
                        <DetailsTab active>Ürün Açıklaması</DetailsTab>
                        <DetailsTab>Özellikler</DetailsTab>
                        <DetailsTab>Değerlendirmeler ({product.reviews})</DetailsTab>
                    </DetailsTabs>

                    <DetailsContent>
                        <DescriptionContainer>
                            <p>{product.description}</p>
                            <FeaturesList>
                                {product.features.map((feature, index) => (
                                    <FeatureItem key={index}>
                                        <FaCheck /> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                            <TagsContainer>
                                <TagsTitle>Etiketler:</TagsTitle>
                                {product.tags.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </TagsContainer>
                        </DescriptionContainer>
                    </DetailsContent>
                </ProductDetails>
            </Container>
        </ProductDetailWrapper>
    );
};

// Styled Components
const ProductDetailWrapper = styled.div`
  padding: 100px 0;
  background-color: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  width: 90%;
  max-width: ${props => props.theme.sizes.container};
  margin: 0 auto;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: 14px;
`;

const BreadcrumbItem = styled.a`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.darkGrey};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  
  &:hover {
    color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 10px;
  color: ${props => props.theme.colors.darkGrey};
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 60px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProductGallery = styled.div``;

const MainImageContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  height: 400px;
  box-shadow: ${props => props.theme.shadows.small};
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.secondary};
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
  
  &::-webkit-scrollbar {
    height: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 10px;
  }
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: ${props => props.theme.transitions.default};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProductInfo = styled.div``;

const ProductCategory = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.darkGrey};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const ProductName = styled.h1`
  font-size: 32px;
  color: ${props => props.theme.colors.secondary};
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
  color: ${props => props.theme.colors.darkGrey};
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
  color: ${props => props.theme.colors.darkGrey};
  text-decoration: line-through;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.grey};
  margin: 25px 0;
`;

const OptionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.secondary};
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
`;

const ColorOption = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SelectedOptionText = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.darkGrey};
  margin-bottom: 25px;
`;

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const SizeOption = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: ${props =>
        !props.available ? '#f0f0f0' :
            props.selected ? props.theme.colors.primary : 'white'};
  color: ${props =>
        !props.available ? '#aaa' :
            props.selected ? 'white' : props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.available ? 'pointer' : 'not-allowed'};
  transition: ${props => props.theme.transitions.default};
  font-weight: 600;
  border: 1px solid ${props =>
        !props.available ? '#e0e0e0' :
            props.selected ? props.theme.colors.primary : '#e0e0e0'};
  
  &:hover {
    background-color: ${props =>
        !props.available ? '#f0f0f0' :
            props.selected ? props.theme.colors.primary : '#f9f9f9'};
    transform: ${props => props.available ? 'translateY(-2px)' : 'none'};
  }
`;

const QuantityContainer = styled.div`
  margin-bottom: 30px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  margin-bottom: 10px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: #f0f0f0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

const QuantityInput = styled.input`
  width: 48px;
  height: 36px;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;

const StockInfo = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.darkGrey};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
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
`;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: #f9f9f9;
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const WishlistButton = styled(IconButton)``;
const ShareButton = styled(IconButton)``;

const BenefitsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
`;

const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${props => props.theme.colors.secondary};
  
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
`;

const DetailsTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const DetailsTab = styled.div`
  padding: 15px 25px;
  font-weight: 600;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.secondary};
  border-bottom: 3px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const DetailsContent = styled.div`
  padding: 30px;
`;

const DescriptionContainer = styled.div`
  p {
    line-height: 1.7;
    color: ${props => props.theme.colors.text};
    margin-bottom: 20px;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  margin-bottom: 30px;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.text};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const TagsTitle = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
`;

const Tag = styled.span`
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: ${props => props.theme.colors.darkGrey};
`;

export default ProductDetail; 