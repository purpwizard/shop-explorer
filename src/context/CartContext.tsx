import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type CartItem = {
    productId: number;
    title: string;
    price: number;
    image?: string;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
    removeItem: (productId: number) => void;
    increment: (productId: number) => void;
    decrement: (productId: number) => void;
    clear: () => void;
    subtotal: number;
    totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [items, setItems] = useLocalStorage<CartItem[]>("shop_cart_v1", []);

    const addItem = (item: Omit<CartItem, "quantity">, qty = 1) => {
        setItems((prev) => {
            const found = prev.find((p) => p.productId === item.productId);
            if (found) {
                return prev.map((p) =>
                    p.productId === item.productId ? { ...p, quantity: p.quantity + qty } : p
                );
            }
            return [...prev, { ...item, quantity: qty }];
        });
    };

    const removeItem = (productId: number) => {
        setItems((prev) => prev.filter((p) => p.productId !== productId));
    };

    const increment = (productId: number) => {
        setItems((prev) => prev.map(p => p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p));
    };

    const decrement = (productId: number) => {
        setItems((prev) =>
            prev
                .map(p => p.productId === productId ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p)
                .filter(p => p.quantity > 0)
        );
    };

    const clear = () => setItems([]);

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const totalItems = items.reduce((s, i) => s + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, increment, decrement, clear, subtotal, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
