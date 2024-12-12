import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { useApi } from "./ApiProvider";

// Define Product Type
export interface Product {
  _id?: string;
  description: string;
  images: string[];
  stock: number;
  name: string;
  price: number;
  orderCount: number;
  dimensions: {
    height: number;
    width: number;
    weight: number;
    lenght: number;
  };
}

// Define State Type
export interface ProductState {
  products: Product[];
  selectedProduct: Product;
}

// Define Action Types
type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_SELECTED_PRODUCT"; payload: Product }
  | { type: "ADD_PRODUCT"; payload: Product };

// Initial State
const initialState: ProductState = {
  products: [],
  selectedProduct: {
    _id: "",
    description: "",
    images: [],
    stock: 0,
    name: "",
    price: 0,
    orderCount: 0,
    dimensions: {
      height: 0,
      width: 0,
      weight: 0,
      lenght: 0,
    },
  },
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
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Context Type
interface ProductContextType {
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  fetchProducts: () => Promise<void>;
  setProduct: (productId: string) => Promise<void>;
  fetchProductById: (productId: string) => Promise<void>;
  addProduct: (newProduct: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

// Create Context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider Component
const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { productsApi } = useApi();

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getProducts();
      dispatch({ type: "SET_PRODUCTS", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const setProduct = async (productId: string) => {
    try {
      const response = await productsApi.getProductById(productId);
      dispatch({ type: "SET_SELECTED_PRODUCT", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const fetchProductById = async (productId: string) => {
    try {
      const response = await productsApi.getProductById(productId);
      dispatch({ type: "SET_SELECTED_PRODUCT", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const addProduct = async (newProduct: Omit<Product, "_id">) => {
    try {
      const response = await productsApi.createProduct(newProduct);
      await fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        fetchProducts,
        setProduct,
        fetchProductById,
        addProduct, // Adicionado aqui
      }}
    >
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
