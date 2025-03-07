import React, { createContext, useContext, useReducer, useEffect } from 'react';
import databaseService from '../services/DatabaseService';

const CartContext = createContext();

// Sepet state başlangıç değeri
const initialState = {
    cartItems: localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingAddress: localStorage.getItem('shippingAddress') ?
        JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod: 'Stripe',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0
};

// Reducer fonksiyonu
function cartReducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const item = action.payload;
            const existItem = state.cartItems.find(
                (x) => x.product === item.product && x.size === item.size && x.color === item.color
            );

            if (existItem) {
                // Veritabanına kaydet
                databaseService.updateCartItemQuantity(
                    existItem.id,
                    existItem.qty + item.qty
                );

                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product && x.size === existItem.size && x.color === existItem.color
                            ? { ...item, qty: existItem.qty + item.qty }
                            : x
                    ),
                };
            } else {
                // Veritabanına kaydet
                databaseService.addToCart({
                    productId: item.product,
                    name: item.name,
                    price: item.price,
                    size: item.size,
                    color: item.color,
                    quantity: item.qty,
                    image: item.image
                });

                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case 'CART_REMOVE_ITEM':
            // Veritabanından sil
            const itemToRemove = state.cartItems.find(
                x => x.product === action.payload.product &&
                    x.size === action.payload.size &&
                    x.color === action.payload.color
            );

            if (itemToRemove && itemToRemove.id) {
                databaseService.removeFromCart(itemToRemove.id);
            }

            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) =>
                        !(x.product === action.payload.product &&
                            x.size === action.payload.size &&
                            x.color === action.payload.color)
                ),
            };

        case 'CART_UPDATE_QUANTITY':
            // Veritabanında güncelle
            const itemToUpdate = state.cartItems.find(
                x => x.product === action.payload.product &&
                    x.size === action.payload.size &&
                    x.color === action.payload.color
            );

            if (itemToUpdate && itemToUpdate.id) {
                databaseService.updateCartItemQuantity(
                    itemToUpdate.id,
                    action.payload.qty
                );
            }

            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.product === action.payload.product &&
                        item.size === action.payload.size &&
                        item.color === action.payload.color
                        ? { ...item, qty: action.payload.qty }
                        : item
                ),
            };

        case 'CART_CLEAR_ITEMS':
            // Veritabanından sepeti temizle
            databaseService.clearCart();

            return {
                ...state,
                cartItems: [],
            };

        case 'CART_SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                shippingAddress: action.payload,
            };

        case 'CART_SAVE_PAYMENT_METHOD':
            return {
                ...state,
                paymentMethod: action.payload,
            };

        case 'CART_CALCULATE_PRICES':
            // Ürünlerin toplam fiyatını hesapla
            const itemsPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
            );

            // Kargo ücretini hesapla (500 TL üzeri ücretsiz kargo)
            const shippingPrice = itemsPrice > 500 ? 0 : 25;

            // Vergiyi hesapla (KDV %18)
            const taxPrice = Number((0.18 * itemsPrice).toFixed(2));

            // Toplam fiyatı hesapla
            const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

            return {
                ...state,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

        case 'CART_LOAD_FROM_DATABASE':
            return {
                ...state,
                cartItems: action.payload.map(item => ({
                    product: item.productId,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    qty: item.quantity,
                    size: item.size,
                    color: item.color,
                    id: item.id
                }))
            };

        default:
            return state;
    }
}

// CartProvider bileşeni
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Veritabanından sepet öğelerini yükle
    useEffect(() => {
        // Sayfa yüklendiğinde veritabanından sepeti al
        const dbCartItems = databaseService.getCartItems();
        if (dbCartItems && dbCartItems.length > 0) {
            dispatch({
                type: 'CART_LOAD_FROM_DATABASE',
                payload: dbCartItems
            });
        }
    }, []);

    // State değiştiğinde localStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

        // Fiyatları yeniden hesapla
        dispatch({ type: 'CART_CALCULATE_PRICES' });
    }, [state.cartItems]);

    useEffect(() => {
        localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    }, [state.shippingAddress]);

    // Sepete ürün ekleme
    const addToCart = (product, size, color, qty) => {
        console.log("Sepete ekleniyor:", { product, size, color, qty });

        try {
            // Resim alanını kontrol et
            let imageToUse = "/PARDUS AYK.-1.png"; // Varsayılan resim

            if (product.images && product.images.length > 0) {
                imageToUse = product.images[0];
            } else if (product.image) {
                imageToUse = product.image;
            }

            dispatch({
                type: 'CART_ADD_ITEM',
                payload: {
                    product: product.id,
                    name: product.name,
                    image: imageToUse,
                    price: product.price,
                    stock: product.stock || 10, // Varsayılan stok
                    size,
                    color,
                    qty,
                },
            });

            console.log("Ürün sepete eklendi!");
        } catch (error) {
            console.error("Sepete eklerken hata:", error);
        }
    };

    // Sepetten ürün çıkarma
    const removeFromCart = (product, size, color) => {
        dispatch({
            type: 'CART_REMOVE_ITEM',
            payload: {
                product,
                size,
                color
            },
        });
    };

    // Ürün adedini güncelleme
    const updateCartQuantity = (product, size, color, qty) => {
        dispatch({
            type: 'CART_UPDATE_QUANTITY',
            payload: {
                product,
                size,
                color,
                qty
            },
        });
    };

    // Sepeti temizleme
    const clearCart = () => {
        dispatch({ type: 'CART_CLEAR_ITEMS' });
    };

    // Teslimat adresini kaydetme
    const saveShippingAddress = (data) => {
        dispatch({
            type: 'CART_SAVE_SHIPPING_ADDRESS',
            payload: data,
        });
    };

    // Ödeme yöntemini kaydetme
    const savePaymentMethod = (data) => {
        dispatch({
            type: 'CART_SAVE_PAYMENT_METHOD',
            payload: data,
        });
    };

    // Sipariş oluşturma
    const createOrder = (data) => {
        const orderData = {
            orderItems: state.cartItems.map(item => ({
                productId: item.product,
                name: item.name,
                quantity: item.qty,
                price: item.price,
                size: item.size,
                color: item.color,
                image: item.image
            })),
            shippingAddress: state.shippingAddress,
            paymentMethod: state.paymentMethod,
            itemsPrice: state.itemsPrice,
            shippingPrice: state.shippingPrice,
            taxPrice: state.taxPrice,
            totalPrice: state.totalPrice,
            ...data
        };

        // Veritabanında sipariş oluştur
        const newOrder = databaseService.createOrder(orderData);

        // Sepeti temizle
        dispatch({ type: 'CART_CLEAR_ITEMS' });

        return newOrder;
    };

    return (
        <CartContext.Provider
            value={{
                ...state,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                clearCart,
                saveShippingAddress,
                savePaymentMethod,
                createOrder
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Kolay kullanım için özel hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext; 