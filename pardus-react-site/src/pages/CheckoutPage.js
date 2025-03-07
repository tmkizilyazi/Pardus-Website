import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaCreditCard, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

// Stripe için bileşenler (Gerçek implementasyonda Stripe kütüphaneleri import edilecek)
const StripeCheckoutForm = ({ onSuccess, onError, totalAmount }) => {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basit kart doğrulama
        if (!cardName || !cardNumber || !expMonth || !expYear || !cvc) {
            setError('Lütfen tüm kart bilgilerini doldurun');
            setLoading(false);
            return;
        }

        if (cardNumber.length !== 16) {
            setError('Kart numarası 16 haneli olmalıdır');
            setLoading(false);
            return;
        }

        if (cvc.length !== 3) {
            setError('CVC kodu 3 haneli olmalıdır');
            setLoading(false);
            return;
        }

        // Gerçek bir uygulama burada Stripe API'yi çağırır
        // Bu örnek için başarılı bir ödeme simüle ediyoruz
        setTimeout(() => {
            setLoading(false);

            // Örnek bir başarılı ödeme
            if (cardNumber === '4242424242424242') {
                onSuccess({
                    id: 'pi_' + Math.random().toString(36).substring(2, 15),
                    amount: totalAmount,
                    currency: 'try',
                    status: 'succeeded'
                });
            } else {
                // Test için farklı kart numaralarında hata döndürebiliriz
                setError('Ödeme işlemi reddedildi. Lütfen kart bilgilerinizi kontrol edin.');
                onError(new Error('Ödeme reddedildi'));
            }
        }, 2000);
    };

    return (
        <StripeForm onSubmit={handleSubmit}>
            <FormRow>
                <FormGroup>
                    <FormLabel>Kart Üzerindeki İsim</FormLabel>
                    <FormInput
                        type="text"
                        placeholder="Ad Soyad"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                    />
                </FormGroup>
            </FormRow>

            <FormRow>
                <FormGroup>
                    <FormLabel>Kart Numarası</FormLabel>
                    <FormInput
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                        maxLength={16}
                        required
                    />
                    <FormHint>Test için: 4242 4242 4242 4242</FormHint>
                </FormGroup>
            </FormRow>

            <FormRow>
                <FormGroup style={{ width: '50%' }}>
                    <FormLabel>Son Kullanma Tarihi</FormLabel>
                    <ExpiryContainer>
                        <ExpiryInput
                            type="text"
                            placeholder="AA"
                            value={expMonth}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                if (parseInt(value) > 12) {
                                    setExpMonth('12');
                                } else {
                                    setExpMonth(value.substring(0, 2));
                                }
                            }}
                            maxLength={2}
                            required
                        />
                        <ExpiryDivider>/</ExpiryDivider>
                        <ExpiryInput
                            type="text"
                            placeholder="YY"
                            value={expYear}
                            onChange={(e) => setExpYear(e.target.value.replace(/\D/g, '').substring(0, 2))}
                            maxLength={2}
                            required
                        />
                    </ExpiryContainer>
                </FormGroup>

                <FormGroup style={{ width: '50%' }}>
                    <FormLabel>Güvenlik Kodu (CVC)</FormLabel>
                    <FormInput
                        type="text"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 3))}
                        maxLength={3}
                        required
                    />
                </FormGroup>
            </FormRow>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <PayButton type="submit" disabled={loading}>
                {loading ? 'İşleniyor...' : `${totalAmount.toLocaleString('tr-TR')} ₺ Öde`}
            </PayButton>

            <SecureInfo>
                <FaLock />
                <span>Bu ödeme 256-bit SSL ile güvenle şifrelenmiştir</span>
            </SecureInfo>
        </StripeForm>
    );
};

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart, totalPrice } = useCart();
    const [step, setStep] = useState('shipping');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'TR'
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        // Sayfa yüklendiğinde en üste kaydır
        window.scrollTo(0, 0);

        // Sepet boşsa ana sayfaya yönlendir
        if (cartItems.length === 0 && !paymentSuccess) {
            navigate('/');
        }
    }, [cartItems, navigate, paymentSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitShipping = (e) => {
        e.preventDefault();
        setStep('payment');
        window.scrollTo(0, 0);
    };

    const handleGoBack = () => {
        if (step === 'payment') {
            setStep('shipping');
        } else {
            navigate('/cart');
        }
    };

    const handlePaymentSuccess = (paymentIntent) => {
        // Başarılı ödeme durumunda
        setPaymentSuccess(true);

        // Rastgele sipariş numarası oluştur
        setOrderNumber('PDR' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'));

        // Sepeti temizle
        clearCart();

        // Sayfayı en üste kaydır
        window.scrollTo(0, 0);
    };

    const handlePaymentError = (error) => {
        console.error('Payment error:', error);
    };

    // Adım gösterimini işle
    const renderStep = () => {
        if (paymentSuccess) {
            return (
                <SuccessContainer>
                    <SuccessIcon>
                        <FaCheck />
                    </SuccessIcon>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Ödemeniz Başarıyla Tamamlandı!
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Sipariş numaranız: <strong>{orderNumber}</strong>
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Siparişiniz ile ilgili detaylar e-posta adresinize gönderilmiştir.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <ContinueShoppingButton onClick={() => navigate('/')}>
                            Alışverişe Devam Et
                        </ContinueShoppingButton>
                    </motion.div>
                </SuccessContainer>
            );
        }

        switch (step) {
            case 'shipping':
                return (
                    <ShippingForm onSubmit={handleSubmitShipping}>
                        <FormTitle>Teslimat Bilgileri</FormTitle>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Ad</FormLabel>
                                <FormInput
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Soyad</FormLabel>
                                <FormInput
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>E-posta</FormLabel>
                                <FormInput
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Telefon</FormLabel>
                                <FormInput
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup style={{ width: '100%' }}>
                                <FormLabel>Adres</FormLabel>
                                <FormInput
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup>
                                <FormLabel>Şehir</FormLabel>
                                <FormInput
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Posta Kodu</FormLabel>
                                <FormInput
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </FormRow>

                        <FormRow>
                            <FormGroup style={{ width: '100%' }}>
                                <FormLabel>Ülke</FormLabel>
                                <FormSelect
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="TR">Türkiye</option>
                                    <option value="DE">Almanya</option>
                                    <option value="US">Amerika Birleşik Devletleri</option>
                                    <option value="GB">Birleşik Krallık</option>
                                    <option value="FR">Fransa</option>
                                </FormSelect>
                            </FormGroup>
                        </FormRow>

                        <FormActions>
                            <BackButton type="button" onClick={handleGoBack}>
                                <FaArrowLeft /> Sepete Dön
                            </BackButton>
                            <NextButton type="submit">
                                Ödeme Adımına Geç
                            </NextButton>
                        </FormActions>
                    </ShippingForm>
                );

            case 'payment':
                return (
                    <PaymentContainer>
                        <FormTitle>Ödeme Bilgileri</FormTitle>

                        <PaymentSummary>
                            <SummaryTitle>Sipariş Özeti</SummaryTitle>
                            <SummaryItems>
                                {cartItems.map((item, index) => (
                                    <SummaryItem key={index}>
                                        <SummaryItemName>
                                            {item.name} <SummaryItemQty>x{item.qty}</SummaryItemQty>
                                        </SummaryItemName>
                                        <SummaryItemPrice>
                                            {(item.price * item.qty).toLocaleString('tr-TR')} ₺
                                        </SummaryItemPrice>
                                    </SummaryItem>
                                ))}
                            </SummaryItems>
                            <SummaryTotal>
                                <SummaryTotalLabel>Toplam</SummaryTotalLabel>
                                <SummaryTotalValue>{parseFloat(totalPrice).toLocaleString('tr-TR')} ₺</SummaryTotalValue>
                            </SummaryTotal>
                        </PaymentSummary>

                        <PaymentMethods>
                            <PaymentMethodTitle>
                                <FaCreditCard />
                                <span>Kredi/Banka Kartı ile Öde</span>
                            </PaymentMethodTitle>

                            <StripeCheckoutForm
                                onSuccess={handlePaymentSuccess}
                                onError={handlePaymentError}
                                totalAmount={parseFloat(totalPrice)}
                            />
                        </PaymentMethods>

                        <FormActions>
                            <BackButton type="button" onClick={handleGoBack}>
                                <FaArrowLeft /> Teslimat Bilgilerine Dön
                            </BackButton>
                        </FormActions>
                    </PaymentContainer>
                );

            default:
                return null;
        }
    };

    return (
        <CheckoutPageWrapper>
            <Container>
                {!paymentSuccess && (
                    <CheckoutSteps>
                        <CheckoutStep active={step === 'shipping'} completed={step === 'payment' || paymentSuccess}>
                            <StepNumber>{step === 'payment' || paymentSuccess ? <FaCheck /> : 1}</StepNumber>
                            <StepTitle>Teslimat</StepTitle>
                        </CheckoutStep>
                        <StepConnector completed={step === 'payment' || paymentSuccess} />
                        <CheckoutStep active={step === 'payment'} completed={paymentSuccess}>
                            <StepNumber>{paymentSuccess ? <FaCheck /> : 2}</StepNumber>
                            <StepTitle>Ödeme</StepTitle>
                        </CheckoutStep>
                        <StepConnector completed={paymentSuccess} />
                        <CheckoutStep active={paymentSuccess} completed={paymentSuccess}>
                            <StepNumber>{paymentSuccess ? <FaCheck /> : 3}</StepNumber>
                            <StepTitle>Onay</StepTitle>
                        </CheckoutStep>
                    </CheckoutSteps>
                )}

                <CheckoutContainer>
                    {renderStep()}
                </CheckoutContainer>
            </Container>
        </CheckoutPageWrapper>
    );
};

// Styled Components
const CheckoutPageWrapper = styled.div`
  padding: 120px 0 80px;
  background-color: ${props => props.theme.colors.background};
  min-height: 80vh;
`;

const Container = styled.div`
  width: 90%;
  max-width: ${props => props.theme.sizes.container};
  margin: 0 auto;
`;

const CheckoutSteps = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const CheckoutStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${({ active, completed }) => `
    ${active ? `
      opacity: 1;
    ` : `
      opacity: 0.6;
    `}
    
    ${completed ? `
      opacity: 1;
    ` : ''}
  `}
`;

const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 8px;
  transition: ${props => props.theme.transitions.default};
`;

const StepTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const StepConnector = styled.div`
  width: 100px;
  height: 2px;
  background-color: ${props => props.completed ? props.theme.colors.primary : props.theme.colors.border};
  margin: 0 15px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 40px;
  }
`;

const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  color: ${props => props.theme.colors.text};
  position: relative;
  padding-bottom: 10px;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const ShippingForm = styled.form`
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  padding: 30px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  width: ${props => props.width || 'auto'};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 15px;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 2;
    justify-content: center;
  }
`;

const NextButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.button};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 1;
  }
`;

const PaymentContainer = styled.div`
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  padding: 30px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const PaymentSummary = styled.div`
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const SummaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SummaryItems = styled.div`
  margin-bottom: 15px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SummaryItemName = styled.div`
  color: ${props => props.theme.colors.text};
`;

const SummaryItemQty = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 14px;
  margin-left: 5px;
`;

const SummaryItemPrice = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  margin-top: 15px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const SummaryTotalLabel = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const SummaryTotalValue = styled.div`
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  font-size: 18px;
`;

const PaymentMethods = styled.div`
  margin-bottom: 30px;
`;

const PaymentMethodTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const StripeForm = styled.form`
  width: 100%;
`;

const ExpiryContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ExpiryInput = styled.input`
  width: 60px;
  padding: 12px 15px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  text-align: center;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
`;

const ExpiryDivider = styled.span`
  margin: 0 8px;
  color: ${props => props.theme.colors.textLight};
`;

const FormHint = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textLight};
  margin-top: 5px;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin: 15px 0;
  padding: 10px;
  background-color: rgba(255, 23, 68, 0.1);
  border-radius: 4px;
  border-left: 3px solid ${props => props.theme.colors.error};
`;

const PayButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 15px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  margin-top: 15px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.disabled ? props.theme.colors.primary : props.theme.colors.secondary};
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px)'};
    box-shadow: ${props => props.disabled ? 'none' : props.theme.shadows.button};
  }
`;

const SecureInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${props => props.theme.colors.textLight};
  margin-top: 15px;
  justify-content: center;
  
  svg {
    color: ${props => props.theme.colors.success};
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  background-color: ${props => props.theme.colors.card};
  border-radius: 8px;
  padding: 60px 30px;
  border: 1px solid ${props => props.theme.colors.border};
  
  h2 {
    font-size: 28px;
    margin: 20px 0 15px;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 10px;
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.colors.success};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: 0 auto 20px;
  box-shadow: 0 10px 20px rgba(0, 200, 83, 0.2);
`;

const ContinueShoppingButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 30px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.button};
  }
`;

export default CheckoutPage; 