import { createContext, useMemo, useState } from "react";
import { createOrder } from "../services/api";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [productsAddedToCart, setProductsAddedToCart] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);

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
            console.log('checkin true')
            setIsCheckingOut(true);
            setCheckoutError(null);
            await new Promise(resolve => setTimeout(resolve, 5000));
            const itemsToSubmit = productsAddedToCart.map(({ id, quantity }) => ({ id, quantity }));
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
    }), [productsAddedToCart, isCheckingOut, checkoutError]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}