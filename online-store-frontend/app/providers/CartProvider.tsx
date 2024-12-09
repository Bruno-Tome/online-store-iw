"use client";
import { createContext, ReactNode, useContext, useReducer } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

// Reducer Function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialState: CartState = { items: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
/*Usage in components

import React from "react";
import { useCartContext } from "./CartProvider";

const AddItemComponent = () => {
  const { dispatch } = useCartContext();

  const handleAddItem = () => {
    const newItem = {
      id: "1",
      name: "Product 1",
      price: 100,
      quantity: 1,
    };
    dispatch({ type: "ADD_ITEM", payload: newItem });
  };

  return <button onClick={handleAddItem}>Add Item</button>;
};

export default AddItemComponent;


*/
