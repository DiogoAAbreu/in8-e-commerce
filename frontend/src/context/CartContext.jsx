import { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [productsAddedToCart, setProductsAddedToCart] = useState([]);

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

    const value = useMemo(() => ({
        productsAddedToCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        itemCount: productsAddedToCart.reduce((sum, item) => sum + item.quantity, 0),
        cartTotal: productsAddedToCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }), [productsAddedToCart]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}