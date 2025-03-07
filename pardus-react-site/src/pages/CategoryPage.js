import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShoppingCart, FaEye, FaStar } from 'react-icons/fa';
import databaseService from '../services/DatabaseService';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kategori adı yoksa veya koleksiyon-kesfet ise tüm ürünleri getir
    if (!categoryName || categoryName === 'koleksiyon-kesfet') {
      const allProducts = databaseService.getProducts();
      setProducts(allProducts);
      setLoading(false);
      return;
    }

    // Kategori adını doğru formata çevir (URL'den gelen formattan)
    const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    // Kategoriye ait ürünleri getir
    const categoryProducts = databaseService.getProductsByCategory(formattedCategoryName);
    setProducts(categoryProducts);
    setLoading(false);
  }, [categoryName]);

  // Kategori başlığını düzenle
  const getCategoryTitle = () => {
    if (!categoryName) return 'Tüm Ürünler';

    switch (categoryName) {
      case 'koleksiyon-kesfet':
        return 'Koleksiyonu Keşfet';
      case 'urunler':
        return 'Tüm Ürünler';
      case 'kramponlar':
        return 'Krampon';
      case 'sneakers':
        return 'Sneakers';
      case 'kosu-ayakkabilari':
        return 'Koşu Ayakkabıları';
      case 'terlikler':
        return 'Terlikler';
      default:
        return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    }
  };

  return (
    <PageContainer>
      <CategoryHeader>
        <h1>{getCategoryTitle()}</h1>
        <CategoryDescription>
          {getCategoryTitle() === 'Koleksiyonu Keşfet' &&
            'Pardus markasının en yeni koleksiyonlarını keşfedin ve tarzınızı yansıtın.'}
          {getCategoryTitle() === 'Tüm Ürünler' &&
            'Pardus markasının tüm ürünlerini keşfedin ve tarzınızı yansıtın.'}
          {getCategoryTitle() === 'Krampon' &&
            'Futbol sahalarının hakimi olmak için gereken güce ulaşın. Pardus kramponlarıyla sahalarda fark yaratın.'}
          {getCategoryTitle() === 'Sneakers' &&
            'Şehir yaşamına uygun, şık ve konforlu sneaker modellerimizle tarzınızı yansıtın.'}
          {getCategoryTitle() === 'Koşu Ayakkabıları' &&
            'Her adımda daha hızlı, her koşuda daha güçlü. Pardus koşu ayakkabılarıyla sınırlarınızı zorlayın.'}
          {getCategoryTitle() === 'Terlikler' &&
            'Günün yorgunluğunu atmak için rahatlığın keyfini çıkarın. Pardus terlikleriyle konfor ayaklarınızda.'}
        </CategoryDescription>
      </CategoryHeader>

      {loading ? (
        <LoadingMessage>Ürünler yükleniyor...</LoadingMessage>
      ) : products.length === 0 ? (
        <NoProductsMessage>
          Bu kategoride henüz ürün bulunmuyor.
        </NoProductsMessage>
      ) : (
        <ProductGrid>
          {products.map(product => (
            <ProductCard key={product.id}>
              <ProductImageContainer>
                <ProductImage src={product.image} alt={product.name} />
                <ProductOverlay>
                  <OverlayButton as={Link} to={`/urun/${product.id}`}>
                    <FaEye /> İncele
                  </OverlayButton>
                </ProductOverlay>
                {product.isNew && <NewBadge>Yeni</NewBadge>}
                {product.discount && <DiscountBadge>İndirim</DiscountBadge>}
              </ProductImageContainer>

              <ProductInfo>
                <ProductCategory>{product.category}</ProductCategory>
                <ProductName as={Link} to={`/urun/${product.id}`}>
                  {product.name}
                </ProductName>

                <ProductRating>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i}
                      color={i < Math.floor(product.rating) ? '#FFD000' : '#E0E0E0'}
                    />
                  ))}
                  <span>({product.reviews})</span>
                </ProductRating>

                <ProductPriceRow>
                  <ProductPrice>
                    {product.price.toLocaleString('tr-TR')} ₺
                    {product.discount && (
                      <DiscountPrice>{product.discount.toLocaleString('tr-TR')} ₺</DiscountPrice>
                    )}
                  </ProductPrice>
                  <AddToCartButton as={Link} to={`/urun/${product.id}`}>
                    <FaShoppingCart />
                  </AddToCartButton>
                </ProductPriceRow>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      )}
    </PageContainer>
  );
};

// Style tanımlamaları
const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 120px 20px 60px;
`;

const CategoryHeader = styled.div`
    margin-bottom: 40px;
    text-align: center;
    
    h1 {
        color: ${props => props.theme.colors.textLight};
        font-size: 32px;
        margin-bottom: 16px;
        position: relative;
        display: inline-block;
        
        &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
            height: 3px;
            background-color: ${props => props.theme.colors.primary};
        }
    }
`;

const CategoryDescription = styled.p`
    color: ${props => props.theme.colors.textLight};
    max-width: 800px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.6;
    opacity: 0.8;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 40px;
    color: ${props => props.theme.colors.textLight};
    font-size: 18px;
`;

const NoProductsMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: ${props => props.theme.colors.textLight};
    font-size: 18px;
    background-color: ${props => props.theme.colors.backgroundLight};
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
`;

const ProductCard = styled.div`
    background-color: ${props => props.theme.colors.backgroundLight};
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: ${props => props.theme.shadows.small};
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: ${props => props.theme.shadows.medium};
    }
`;

const ProductImageContainer = styled.div`
    position: relative;
    padding-top: 100%; /* 1:1 aspect ratio */
    overflow: hidden;
`;

const ProductImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    ${ProductCard}:hover & {
        transform: scale(1.05);
    }
`;

const ProductOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    ${ProductCard}:hover & {
        opacity: 1;
    }
`;

const OverlayButton = styled.button`
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textLight};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    text-decoration: none;
    
    &:hover {
        background-color: ${props => props.theme.colors.primary};
    }
`;

const NewBadge = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.textDark};
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
`;

const DiscountBadge = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textLight};
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
`;

const ProductInfo = styled.div`
    padding: 20px;
`;

const ProductCategory = styled.div`
    font-size: 12px;
    text-transform: uppercase;
    color: ${props => props.theme.colors.textLight};
    opacity: 0.7;
    margin-bottom: 5px;
`;

const ProductName = styled.h3`
    color: ${props => props.theme.colors.textLight};
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

const ProductRating = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 2px;
    
    span {
        margin-left: 5px;
        font-size: 12px;
        color: ${props => props.theme.colors.textLight};
        opacity: 0.7;
    }
`;

const ProductPriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProductPrice = styled.div`
    color: ${props => props.theme.colors.textLight};
    font-weight: 600;
    font-size: 18px;
`;

const DiscountPrice = styled.span`
    display: block;
    text-decoration: line-through;
    color: ${props => props.theme.colors.textLight};
    opacity: 0.6;
    font-size: 14px;
    font-weight: 400;
`;

const AddToCartButton = styled.button`
    background-color: ${props => props.theme.colors.backgroundDark};
    color: ${props => props.theme.colors.textLight};
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: ${props => props.theme.colors.primary};
    }
`;

export default CategoryPage; 