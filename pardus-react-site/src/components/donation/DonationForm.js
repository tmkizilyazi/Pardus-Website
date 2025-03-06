import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCreditCard } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Stripe public key (test mode)
const stripePromise = loadStripe('pk_test_your_stripe_key');

const CheckoutForm = () => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState(50);
    const [isCustomAmount, setIsCustomAmount] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleAmountSelect = (selectedAmount) => {
        if (selectedAmount === 'custom') {
            setIsCustomAmount(true);
        } else {
            setAmount(selectedAmount);
            setIsCustomAmount(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setPaymentError('');

        try {
            // Create payment intent on your server
            const { data } = await axios.post('/api/create-payment-intent', {
                amount: amount * 100, // Convert to cents
                email,
            });

            // Confirm card payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email,
                    },
                },
            });

            if (error) {
                setPaymentError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setPaymentSuccess(true);
            }
        } catch (err) {
            setPaymentError('Ödeme işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }

        setIsProcessing(false);
    };

    if (paymentSuccess) {
        return (
            <SuccessMessage>
                <h3>Bağışınız için teşekkür ederiz!</h3>
                <p>Desteğiniz Pardus'un gelişimine katkı sağlayacaktır.</p>
            </SuccessMessage>
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="email">E-posta Adresiniz</Label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="E-posta adresiniz"
                />
            </FormGroup>

            <FormGroup>
                <Label>Bağış Miktarı (TL)</Label>
                <AmountOptions>
                    <AmountOption
                        type="button"
                        className={amount === 50 && !isCustomAmount ? 'active' : ''}
                        onClick={() => handleAmountSelect(50)}
                    >
                        50 ₺
                    </AmountOption>
                    <AmountOption
                        type="button"
                        className={amount === 100 && !isCustomAmount ? 'active' : ''}
                        onClick={() => handleAmountSelect(100)}
                    >
                        100 ₺
                    </AmountOption>
                    <AmountOption
                        type="button"
                        className={amount === 250 && !isCustomAmount ? 'active' : ''}
                        onClick={() => handleAmountSelect(250)}
                    >
                        250 ₺
                    </AmountOption>
                    <AmountOption
                        type="button"
                        className={amount === 500 && !isCustomAmount ? 'active' : ''}
                        onClick={() => handleAmountSelect(500)}
                    >
                        500 ₺
                    </AmountOption>
                    <AmountOption
                        type="button"
                        className={isCustomAmount ? 'active' : ''}
                        onClick={() => handleAmountSelect('custom')}
                    >
                        Diğer
                    </AmountOption>
                </AmountOptions>

                {isCustomAmount && (
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="5"
                    />
                )}
            </FormGroup>

            <FormGroup>
                <Label>Kart Bilgileri</Label>
                <CardElementContainer>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </CardElementContainer>
            </FormGroup>

            {paymentError && <ErrorMessage>{paymentError}</ErrorMessage>}

            <DonationButton type="submit" disabled={!stripe || isProcessing}>
                <span>{isProcessing ? 'İşleniyor...' : 'Destek Ol'}</span>
                <FaCreditCard />
            </DonationButton>
        </Form>
    );
};

const DonationForm = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: ${props => props.theme.borderRadius.small};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 15px;
  transition: ${props => props.theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1);
  }
`;

const AmountOptions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const AmountOption = styled.button`
  padding: 10px 15px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid #e0e0e0;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  font-weight: 500;
  transition: ${props => props.theme.transitions.default};
  color: ${props => props.theme.colors.primary};
  
  &:hover, &.active {
    background-color: ${props => props.theme.colors.accent};
    color: white;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const CardElementContainer = styled.div`
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  border-radius: ${props => props.theme.borderRadius.small};
  background: white;
  transition: ${props => props.theme.transitions.default};
  
  &:focus-within {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1);
  }
`;

const DonationButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 15px;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 30px;
  background-color: #f0f9eb;
  border-radius: ${props => props.theme.borderRadius.small};
  border-left: 4px solid #67c23a;
  margin-bottom: 20px;
  
  h3 {
    color: #67c23a;
    margin-bottom: 10px;
  }
  
  p {
    color: ${props => props.theme.colors.text};
  }
`;

export default DonationForm; 