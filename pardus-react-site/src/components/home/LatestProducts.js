import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaShoppingCart, FaEye, FaStar } from 'react-icons/fa';
import databaseService from '../../services/DatabaseService';

const LatestProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // En son eklenen ürünleri getir
        const latestProducts = databaseService.getLatestProducts(4);
        setProducts(latestProducts);
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/urun/${productId}`);
    };

    return (
        <LatestProductsSection>
            <Container>
                <SectionHeader>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        EN SON EKLENEN ÜRÜNLER
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Yeni koleksiyonumuzdan en yeni ürünleri keşfedin
                    </motion.p>
                </SectionHeader>

                <ProductGrid>
                    {products.map(product => (
                        <ProductCard key={product.id}
                            as={motion.div}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <ProductImageContainer>
                                <ProductImage
                                    src={product.image}
                                    alt={product.name}
                                    onClick={() => handleProductClick(product.id)}
                                />
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
                                <ProductName
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    {product.name}
                                </ProductName>

                                <ProductRating>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i}
                                            color={i < Math.floor(product.rating) ? '#FFD000' : '#555555'}
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

                <ViewAllButton to="/urunler">
                    Tüm Ürünleri Görüntüle
                </ViewAllButton>
            </Container>
        </LatestProductsSection>
    );
};

// Style tanımlamaları
const LatestProductsSection = styled.section`
    padding: 80px 0;
    background-color: var(--color-background);
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: 50px;
    
    h2 {
        color: var(--color-text-light);
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
            width: 60px;
            height: 3px;
            background-color: var(--color-primary);
        }
    }
    
    p {
        color: var(--color-text-light);
        font-size: 16px;
        max-width: 600px;
        margin: 0 auto;
        opacity: 0.8;
    }
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
`;

const ProductCard = styled.div`
    background-color: var(--color-background-light);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: var(--shadow-sm);
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-md);
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
    cursor: pointer;
    
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
    background-color: var(--color-background);
    color: var(--color-text-light);
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
        background-color: var(--color-primary);
    }
`;

const NewBadge = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: var(--color-accent);
    color: var(--color-text-dark);
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
`;

const DiscountBadge = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--color-primary);
    color: var(--color-text-light);
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
    color: var(--color-text-light);
    opacity: 0.7;
    margin-bottom: 5px;
`;

const ProductName = styled.h3`
    color: var(--color-text-light);
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
        color: var(--color-primary);
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
        color: var(--color-text-light);
        opacity: 0.7;
    }
`;

const ProductPriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProductPrice = styled.div`
    color: var(--color-text-light);
    font-weight: 600;
    font-size: 18px;
`;

const DiscountPrice = styled.span`
    display: block;
    text-decoration: line-through;
    color: var(--color-text-light);
    opacity: 0.6;
    font-size: 14px;
    font-weight: 400;
`;

const AddToCartButton = styled.button`
    background-color: var(--color-background-dark);
    color: var(--color-text-light);
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
        background-color: var(--color-primary);
    }
`;

const ViewAllButton = styled(Link)`
    display: block;
    width: 220px;
    margin: 0 auto;
    padding: 12px 0;
    background-color: transparent;
    color: var(--color-text-light);
    border: 2px solid var(--color-primary);
    border-radius: 30px;
    text-align: center;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: var(--color-primary);
        color: var(--color-text-light);
    }
`;

export default LatestProducts; 