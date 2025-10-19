"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCartQuantity } from "@/lib/data/cart";

type CartContextType = {
  cartQuantity: number;
  refreshCartQuantity: () => Promise<void>;
  setCartQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  const refreshCartQuantity = async () => {
    const quantity = await getCartQuantity();
    setCartQuantity(quantity);
  };

  useEffect(() => {
    refreshCartQuantity();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartQuantity, refreshCartQuantity, setCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
