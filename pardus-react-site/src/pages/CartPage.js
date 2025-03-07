import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaTrash, FaAngleLeft, FaTruck, FaLock, FaBox, FaCreditCard, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import databaseService from '../services/DatabaseService';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateCartQuantity, clearCart, totalPrice, shippingPrice, taxPrice, itemsPrice } = useCart();
  const [loading, setLoading] = useState(true);
  const [dbCartItems, setDbCartItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  // Veritabanından sepet öğelerini yükle
  useEffect(() => {
    setLoading(true);
    // Veritabanından sepet öğelerini al
    const items = databaseService.getCartItems();
    console.log("Veritabanından sepet yüklendi:", items);
    setDbCartItems(items);
    setLoading(false);
  }, [cartItems.length]); // cartItems.length değiştiğinde yeniden yükle

  // Sepet boş olduğunda görüntülenen komponent
  const EmptyCart = () => (
    <EmptyCartContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <EmptyCartIcon>
        <FaShoppingBag />
      </EmptyCartIcon>
      <EmptyCartTitle>Sepetiniz Boş</EmptyCartTitle>
      <EmptyCartText>
        Sepetinizde henüz ürün bulunmuyor. Hemen alışverişe başlayın ve Pardus'un gücünü keşfedin.
      </EmptyCartText>
      <ContinueShoppingButton to="/koleksiyon-kesfet">
        Alışverişe Başla
      </ContinueShoppingButton>
    </EmptyCartContainer>
  );

  // Kupon kodu uygulama fonksiyonu
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Lütfen bir kupon kodu girin');
      return;
    }

    // Geçici olarak - gerçek uygulamada API'ye istek atılır
    if (couponCode.toUpperCase() === 'PARDUS10') {
      setAppliedCoupon(couponCode);
      setCouponError('');
      alert('Kupon kodu başarıyla uygulandı! %10 indirim kazandınız.');
    } else {
      setCouponError('Geçersiz kupon kodu');
    }
  };

  // Sipariş tamamlama fonksiyonu
  const handleCheckout = () => {
    navigate('/odeme');
  };

  // Yükleniyor durumu
  if (loading) {
    return (
      <LoadingContainer>
        <h2>Sepet Yükleniyor...</h2>
      </LoadingContainer>
    );
  }

  // Sepet boşsa EmptyCart bileşenini göster
  if (cartItems.length === 0 && dbCartItems.length === 0) {
    return <EmptyCart />;
  }

  // Sepet öğelerini hazırla
  const displayItems = cartItems.length > 0 ? cartItems : dbCartItems.map(item => ({
    product: item.productId,
    name: item.name,
    image: item.image,
    price: item.price,
    qty: item.quantity,
    size: item.size,
    color: item.color,
    id: item.id
  }));

  return (
    <CartPageWrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Container>
        <PageHeader>
          <PageTitle>Alışveriş Sepeti</PageTitle>
          <ItemCount>{displayItems.length} Ürün</ItemCount>
        </PageHeader>

        <CartContent>
          <CartItemsContainer>
            <CartHeader>
              <CartHeaderItem style={{ flex: 2 }}>Ürün</CartHeaderItem>
              <CartHeaderItem>Fiyat</CartHeaderItem>
              <CartHeaderItem>Adet</CartHeaderItem>
              <CartHeaderItem>Toplam</CartHeaderItem>
              <CartHeaderItem></CartHeaderItem>
            </CartHeader>

            {displayItems.map((item, index) => (
              <CartItem
                key={`${item.product}-${item.size}-${item.color}-${index}`}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductDetails>
                  <ProductImage>
                    <img src={item.image} alt={item.name} />
                  </ProductImage>
                  <ProductInfo>
                    <ProductName>{item.name}</ProductName>
                    <ProductVariants>
                      <ProductVariant>Renk: <ColorSwatch color={item.color} /></ProductVariant>
                      <ProductVariant>Beden: {item.size}</ProductVariant>
                    </ProductVariants>
                  </ProductInfo>
                </ProductDetails>

                <ProductPrice>{item.price ? item.price.toLocaleString('tr-TR') : 0} ₺</ProductPrice>

                <QuantitySelector>
                  <QuantityButton
                    onClick={() => updateCartQuantity(item.product, item.size, item.color, Math.max(1, item.qty - 1))}
                    disabled={item.qty <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityValue>{item.qty}</QuantityValue>
                  <QuantityButton
                    onClick={() => updateCartQuantity(item.product, item.size, item.color, Math.min(item.stock || 10, item.qty + 1))}
                    disabled={item.qty >= (item.stock || 10)}
                  >
                    +
                  </QuantityButton>
                </QuantitySelector>

                <ProductTotal>
                  {(item.price * item.qty).toLocaleString('tr-TR')} ₺
                </ProductTotal>

                <RemoveButton onClick={() => removeFromCart(item.product, item.size, item.color)}>
                  <FaTrash />
                </RemoveButton>
              </CartItem>
            ))}

            <CartActions>
              <ContinueShopping to="/koleksiyon-kesfet">
                <FaAngleLeft />
                <span>Alışverişe Devam Et</span>
              </ContinueShopping>
              <ClearCartButton onClick={clearCart}>Sepeti Temizle</ClearCartButton>
            </CartActions>
          </CartItemsContainer>

          <CartSummary>
            <SummaryTitle>Sipariş Özeti</SummaryTitle>

            <CouponSection>
              <CouponInput
                type="text"
                placeholder="İndirim Kodu"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <CouponButton onClick={handleApplyCoupon}>Uygula</CouponButton>
              {couponError && <CouponError>{couponError}</CouponError>}
              {appliedCoupon && <AppliedCoupon>"{appliedCoupon}" uygulandı</AppliedCoupon>}
            </CouponSection>

            <SummaryItem>
              <SummaryItemText>Ara Toplam</SummaryItemText>
              <SummaryItemPrice>{itemsPrice ? itemsPrice.toLocaleString('tr-TR') : 0} ₺</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>KDV (%18)</SummaryItemText>
              <SummaryItemPrice>{taxPrice ? taxPrice.toLocaleString('tr-TR') : 0} ₺</SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Kargo</SummaryItemText>
              <SummaryItemPrice>
                {shippingPrice === 0 ? 'Ücretsiz' : `${shippingPrice ? shippingPrice.toLocaleString('tr-TR') : 0} ₺`}
              </SummaryItemPrice>
            </SummaryItem>

            {appliedCoupon && (
              <SummaryItem>
                <SummaryItemText>İndirim</SummaryItemText>
                <SummaryItemPrice>-{((totalPrice || 0) * 0.1).toLocaleString('tr-TR')} ₺</SummaryItemPrice>
              </SummaryItem>
            )}

            <TotalAmount>
              <TotalText>Toplam</TotalText>
              <TotalPrice>
                {appliedCoupon
                  ? ((totalPrice || 0) * 0.9).toLocaleString('tr-TR')
                  : (totalPrice || 0).toLocaleString('tr-TR')
                } ₺
              </TotalPrice>
            </TotalAmount>

            <CheckoutButton onClick={handleCheckout}>
              Ödemeye Geç <FaCreditCard />
            </CheckoutButton>

            <SecureCheckout>
              <FaLock /> Güvenli ödeme
            </SecureCheckout>

            <BenefitsContainer>
              <Benefit>
                <FaTruck />
                <span>Hızlı Teslimat</span>
              </Benefit>
              <Benefit>
                <FaBox />
                <span>Kolay İade</span>
              </Benefit>
            </BenefitsContainer>
          </CartSummary>
        </CartContent>
      </Container>
    </CartPageWrapper>
  );
};

// Stil Tanımları
const CartPageWrapper = styled.div`
  padding: 60px 0;
  min-height: 60vh;
  background-color: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 20px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  color: ${props => props.theme.colors.text};
  font-weight: 700;
`;

const ItemCount = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.textLight};
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsContainer = styled.div``;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const CartHeaderItem = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  
  &:first-child {
    text-align: left;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    padding-bottom: 30px;
  }
`;

// Yükleniyor durumu için bir stil tanımı
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  color: ${props => props.theme.colors.primary};
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 15px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.text};
`;

const ProductVariants = styled.div`
  display: flex;
  gap: 15px;
`;

const ProductVariant = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ColorSwatch = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid ${props => props.theme.colors.border};
`;

const ProductPrice = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
    margin-bottom: 10px;
    width: 100%;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-bottom: 10px;
  }
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.disabled ? props.theme.colors.backgroundAlt : 'white'};
  color: ${props => props.disabled ? props.theme.colors.textLight : props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.disabled ? props.theme.colors.backgroundAlt : props.theme.colors.backgroundAlt};
  }
`;

const QuantityValue = styled.div`
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const ProductTotal = styled.div`
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
    margin-bottom: 10px;
  }
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  padding: 5px;
  transition: ${props => props.theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.colors.error};
  }
  
  @media (max-width: 768px) {
    position: absolute;
    top: 20px;
    right: 0;
  }
`;

const CartActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ContinueShopping = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    text-decoration: underline;
  }
`;

const ClearCartButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  font-size: 14px;
  
  &:hover {
    color: ${props => props.theme.colors.error};
  }
`;

const CartSummary = styled.div`
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: 8px;
  padding: 25px;
  position: sticky;
  top: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 15px;
`;

const CouponSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const CouponInput = styled.input`
  padding: 12px 15px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CouponButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 15px;
  cursor: pointer;
  font-weight: 500;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const CouponError = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 13px;
  margin-top: 8px;
`;

const AppliedCoupon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 13px;
  margin-top: 8px;
  font-weight: 500;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const SummaryItemText = styled.div`
  font-size: 15px;
  color: ${props => props.theme.colors.textLight};
`;

const SummaryItemPrice = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  padding-top: 15px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const TotalText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const TotalPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
  }
  
  svg {
    font-size: 18px;
  }
`;

const SecureCheckout = styled.div`
  text-align: center;
  font-size: 13px;
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
`;

const BenefitsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: 20px;
`;

const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${props => props.theme.colors.textLight};
  
  svg {
    font-size: 20px;
    color: ${props => props.theme.colors.primary};
  }
`;

// Boş sepet stili
const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 60vh;
`;

const EmptyCartIcon = styled.div`
  font-size: 80px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  opacity: 0.8;
`;

const EmptyCartTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const EmptyCartText = styled.p`
  font-size: 16px;
  color: ${props => props.theme.colors.textLight};
  max-width: 500px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 12px 25px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

export default CartPage; 