import React, { createContext, useReducer, ReactNode, useContext } from "react";

// Define Product Type
export interface Product {
  _id: number;
  description: string;
  images: string[];
  stock: number;
  name: string;
  price: number;
}

// Define State Type
export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}

// Define Action Types
type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_SELECTED_PRODUCT"; payload: Product };

// Initial State
const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

// Reducer Function
const productReducer = (
  state: ProductState,
  action: ProductAction,
): ProductState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Context Type
interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
}

// Create Context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider Component
const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook for Consuming Context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export { ProductProvider };
