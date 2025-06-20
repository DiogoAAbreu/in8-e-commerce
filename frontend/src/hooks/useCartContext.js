import { useContext } from "react";
import { CartContext } from "../context/CartContext";


export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart deve ser usado dentro de um CartProvider');
    }
    return context;
};