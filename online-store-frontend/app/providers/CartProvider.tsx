"use client";
import { createContext, memo, ReactNode, useContext, useReducer } from "react";
import { Product } from "./ProductProvider";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  data: Product;
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
      const items = [...state.items];
      if (!items.find((item) => item.id === action.payload.id)) {
        return { ...state, items: [...items, action.payload] };
      }

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
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialState: CartState = { items: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProductToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        data: product,
      },
    });
  };
  const removeProductFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addProductToCart,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default memo(CartProvider);

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
