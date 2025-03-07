import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaArrowRight, FaArrowLeft, FaEye } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedToCartMap, setAddedToCartMap] = useState({});

  const products = [
    {
      id: 1,
      name: "Krampo X9 Pro",
      price: 2499.99,
      discount: 2999.99,
      rating: 4.9,
      reviews: 128,
      image: "/PARDUS AYK.-1.png",
      category: "Profesyonel",
      new: true,
      colors: ["#000000", "#ff6b00", "#0057ff"],
      sizes: [
        { id: 1, size: "40" },
        { id: 2, size: "41" },
        { id: 3, size: "42" }
      ],
      stock: 15
    },
    {
      id: 2,
      name: "Krampo Velocity",
      price: 1899.99,
      discount: null,
      rating: 4.7,
      reviews: 94,
      image: "/PARDUS AYK.-1.png",
      category: "Hız",
      new: false,
      colors: ["#ff0000", "#ffffff", "#000000"],
      sizes: [
        { id: 1, size: "39" },
        { id: 2, size: "40" },
        { id: 3, size: "41" }
      ],
      stock: 10
    },
    {
      id: 3,
      name: "Krampo PrecisionX",
      price: 2199.99,
      discount: 2499.99,
      rating: 4.8,
      reviews: 112,
      image: "/PARDUS AYK.-1.png",
      category: "Kontrol",
      new: true,
      colors: ["#ffd700", "#000000", "#ffffff"],
      sizes: [
        { id: 1, size: "40" },
        { id: 2, size: "42" },
        { id: 3, size: "43" }
      ],
      stock: 8
    },
    {
      id: 4,
      name: "Krampo Defender",
      price: 1699.99,
      discount: null,
      rating: 4.6,
      reviews: 86,
      image: "/PARDUS AYK.-1.png",
      category: "Defans",
      new: false,
      colors: ["#28a745", "#000000", "#333333"],
      sizes: [
        { id: 1, size: "38" },
        { id: 2, size: "39" },
        { id: 3, size: "40" }
      ],
      stock: 12
    },
    {
      id: 5,
      name: "Krampo Elite",
      price: 2799.99,
      discount: 3299.99,
      rating: 5.0,
      reviews: 74,
      image: "/PARDUS AYK.-1.png",
      category: "Premium",
      new: true,
      colors: ["#000000", "#ffd700", "#ffffff"],
      sizes: [
        { id: 1, size: "41" },
        { id: 2, size: "42" },
        { id: 3, size: "43" }
      ],
      stock: 5
    }
  ];

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <ArrowButton right onClick={onClick}>
        <FaArrowRight />
      </ArrowButton>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <ArrowButton left onClick={onClick}>
        <FaArrowLeft />
      </ArrowButton>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  // Star rendering helper
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

  const handleProductClick = (productId) => {
    navigate(`/urun/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, product.sizes ? product.sizes[0].size : "Standart", product.colors[0].code || product.colors[0], 1);

    setAddedToCartMap(prev => ({
      ...prev,
      [product.id]: true
    }));

    setTimeout(() => {
      setAddedToCartMap(prev => ({
        ...prev,
        [product.id]: false
      }));
    }, 2000);
  };

  return (
    <ProductSection>
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            YENİ SEZON ÜRÜNLER
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            En yüksek performans için tasarlanmış yeni sezon kramponlarımızı keşfedin
          </motion.p>
        </SectionHeader>

        <StyledSlider {...settings}>
          {products.map((product) => (
            <ProductCard key={product.id}>
              {product.new && <NewBadge>YENİ</NewBadge>}
              {product.discount && (
                <DiscountBadge>
                  {Math.round(((product.discount - product.price) / product.discount) * 100)}%
                </DiscountBadge>
              )}
              <ProductImage onClick={() => handleProductClick(product.id)}>
                <img src={product.image} alt={product.name} />
                <ViewButton onClick={(e) => {
                  e.stopPropagation();
                  handleProductClick(product.id);
                }}>
                  <FaEye />
                  <span>İncele</span>
                </ViewButton>
              </ProductImage>
              <ProductInfo>
                <ProductCategory>{product.category}</ProductCategory>
                <ProductName onClick={() => handleProductClick(product.id)}>
                  {product.name}
                </ProductName>
                <PriceContainer>
                  <ProductPrice>{product.price.toLocaleString('tr-TR')} ₺</ProductPrice>
                  {product.discount && (
                    <OldPrice>{product.discount.toLocaleString('tr-TR')} ₺</OldPrice>
                  )}
                </PriceContainer>
                <RatingContainer>
                  <Stars>{renderStars(product.rating)}</Stars>
                  <ReviewCount>({product.reviews})</ReviewCount>
                </RatingContainer>
                <ColorOptions>
                  {product.colors.map((color, index) => (
                    <ColorOption
                      key={index}
                      color={typeof color === 'string' ? color : color.code}
                      className={index === 0 ? 'active' : ''}
                    />
                  ))}
                </ColorOptions>
                <AddToCartButton onClick={(e) => handleAddToCart(e, product)}>
                  {addedToCartMap[product.id] ? (
                    <>✓ Sepete Eklendi</>
                  ) : (
                    <>
                      <FaShoppingCart />
                      <span>Sepete Ekle</span>
                    </>
                  )}
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </StyledSlider>

        <ViewAllButton to="/koleksiyon-kesfet">
          <span>Koleksiyonu Keşfet</span>
          <FaArrowRight />
        </ViewAllButton>
      </Container>
    </ProductSection>
  );
};

const ProductSection = styled.section`
  background-color: ${props => props.theme.colors.background};
  padding: 100px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b00' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.6;
    z-index: 0;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: ${props => props.theme.sizes.container};
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 36px;
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 16px;
    font-weight: 800;
  }
  
  p {
    font-size: 18px;
    color: ${props => props.theme.colors.darkGrey};
    max-width: 800px;
    margin: 0 auto;
  }
`;

const StyledSlider = styled(Slider)`
  margin-bottom: 50px;
  
  .slick-dots {
    bottom: -40px;
    
    li button:before {
      font-size: 10px;
      color: ${props => props.theme.colors.primary};
      opacity: 0.3;
    }
    
    li.slick-active button:before {
      opacity: 1;
    }
  }
  
  .slick-slide {
    padding: 15px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.left ? 'left: -30px;' : 'right: -30px;'}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: ${props => props.theme.shadows.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const ProductCard = styled.div`
  background-color: ${props => props.theme.colors.light};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.default};
  position: relative;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const NewBadge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
  z-index: 1;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.secondary};
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
  z-index: 1;
`;

const ProductImage = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    transition: transform 0.5s;
    position: relative;
    z-index: 1;
  }
  
  ${ProductCard}:hover & img {
    transform: scale(1.05) rotate(-5deg);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgba(255, 72, 0, 0.05) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    z-index: 0;
  }
`;

const ViewButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  opacity: 0;
  transition: all 0.3s;
  z-index: 2;
  border: none;
  cursor: pointer;
  
  ${ProductImage}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductCategory = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.darkGrey};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;

const ProductName = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const OldPrice = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.darkGrey};
  text-decoration: line-through;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
`;

const Stars = styled.div`
  display: flex;
  color: ${props => props.theme.colors.accent};
  font-size: 14px;
`;

const ReviewCount = styled.div`
  font-size: 13px;
  color: ${props => props.theme.colors.darkGrey};
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid transparent;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &.active {
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:hover {
    transform: scale(1.1);
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
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
  }
`;

const ViewAllButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  padding: 15px 30px;
  border-radius: 4px;
  font-weight: 600;
  margin: 40px auto 0;
  max-width: 200px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

export default ProductSlider; 