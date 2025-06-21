import { createContext, useMemo, useState, useEffect } from "react";
import { createOrder } from "../services/api";

const CART_STORAGE_KEY = 'in8-e-commerce-cart';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [productsAddedToCart, setProductsAddedToCart] = useState(() => {
        try {
            const storedItems = window.localStorage.getItem(CART_STORAGE_KEY);
            return storedItems ? JSON.parse(storedItems) : [];
        } catch (error) {
            return [];
        }
    });

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);

    useEffect(() => {
        try {
            window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(productsAddedToCart));
        } catch (error) {
            console.error("Erro ao guardar o carrinho no localStorage", error);
        }
    }, [productsAddedToCart]);

    const addToCart = (product) => {
        setProductsAddedToCart(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setProductsAddedToCart(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setProductsAddedToCart([]);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setProductsAddedToCart(prevItems =>
                prevItems.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const checkout = async () => {
        if (productsAddedToCart.length === 0 || isCheckingOut) return;

        try {
            setIsCheckingOut(true);
            setCheckoutError(null);

            const itemsToSubmit = productsAddedToCart.map(({ id, quantity, discountValue, hasDiscount }) => ({ id, quantity, discountValue, hasDiscount }));
            const response = await createOrder(itemsToSubmit);
            const newOrder = response.data;

            clearCart();
            return newOrder;
        } catch (error) {
            setCheckoutError("Não foi possível finalizar a sua compra. Por favor, tente novamente.");
            return null;
        } finally {
            setIsCheckingOut(false);
        }
    }

    const value = useMemo(() => ({
        productsAddedToCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        checkout,
        checkoutError,
        isCheckingOut,
        itemCount: productsAddedToCart.reduce((sum, item) => sum + item.quantity, 0),
        cartTotal: productsAddedToCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        discountTotal: productsAddedToCart.reduce((sum, item) => sum + item.discountValue * item.quantity, 0),
    }), [productsAddedToCart, isCheckingOut, checkoutError]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}