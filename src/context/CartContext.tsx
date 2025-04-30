'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    size?: string;
    category?: string;
    thumbnail?: string;
    description?: string;
    stock?: number;
    rating?: number;
    reviews?: number;
    status?: string;
    brand?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    isInCart: (productId: string) => boolean;
    updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existingItem = prev.find(i => i.productId === item.productId);
            if (existingItem) {
                return prev.map(i =>
                    i.productId === item.productId
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(i => i.productId !== productId));
    };

    const isInCart = (productId: string) => {
        return cartItems.some(i => i.productId === productId);
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.productId === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};