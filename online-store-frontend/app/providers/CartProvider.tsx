"use client";
import {
  createContext,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Product } from "./ProductProvider";
import usePersistState from "./usePersistState";
import { set } from "store";
import { QuotationResponse, useApi } from "./ApiProvider";
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  data: Product;
}

interface CartState {
  items: CartItem[];
  quote: Quote;
  quotations: QuotationResponse[];
}

interface Quote {
  id: any;
  name: string;
  price: string;
  delivery_time: number;
  company: {
    name: string;
  };
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "INITIALIZE"; payload: CartState }
  | { type: "QUOTE_PRODUCTS"; payload: QuotationResponse[] }
  | { type: "SELECT_QUOTE"; payload: Quote }
  | { type: "CLEAR_QUOTE" };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addProductToCart: (product: Product, quantity: number) => void;
  removeProductFromCart: (productId: string) => void;
  quoteProducts: () => void;
  setQuote: (quote: Quote) => void;
  clearCart: () => void;
}
export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { ordersApi, quotationApi } = useApi();

  const initialState: CartState = {
    items: [],
    quote: {
      id: "",
      name: "",
      price: "",
      delivery_time: 0,
      company: {
        name: "",
      },
    },
    quotations: [],
  };
  // Reducer Function
  const [cart, setCart] = usePersistState("cart", initialState); // Retrieves persisted data
  const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
      case "ADD_ITEM":
        const items = [...state.items];
        const addItemState = { ...state, items: [...items, action.payload] };
        setCart(addItemState);
        return addItemState;

      case "REMOVE_ITEM":
        const removeItemState = {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
        setCart(removeItemState);
        return removeItemState;
      case "CLEAR_CART":
        setCart({
          items: [],
          quote: {
            id: "",
            name: "",
            price: "0",
            delivery_time: 0,
            company: {
              name: "",
            },
          },
          quotations: [],
        });
        return { ...state, items: [] };
      case "QUOTE_PRODUCTS":
        setCart({
          ...state,
          quotations: action.payload,
          quote: {
            id: "",
            name: "",
            price: "0",
            delivery_time: 0,
            company: { name: "" },
          },
        });

        return {
          ...state,
          quotations: action.payload,
          quote: {
            id: "",
            name: "",
            price: "0",
            delivery_time: 0,
            company: { name: "" },
          },
        };
      case "SELECT_QUOTE":
        return { ...state, quote: action.payload };
      case "INITIALIZE":
        return action.payload;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  const [state, dispatch] = useReducer(cartReducer, cart); // Initializes context with persisted data
  useEffect(() => {
    dispatch({ type: "INITIALIZE", payload: cart });
  }, [cart]);
  const addProductToCart = (product: Product, quantity: number) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
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
  const quoteProducts = async () => {
    const products = state.items.map((item) => {
      return {
        width: item.data.dimensions.width,
        height: item.data.dimensions.height,
        length: item.data.dimensions.lenght,
        weight: item.data.dimensions.weight,
        insuranceValue: item.data.price,
        quantity: item.quantity,
      };
    });
    const quotation = {
      from: {
        postal_code: "12345678",
      },
      to: {
        postal_code: "87654321",
      },
      products: products,
    };
    const quotes = await (await quotationApi.quotation(quotation)).data;

    dispatch({ type: "QUOTE_PRODUCTS", payload: quotes });
  };
  const setQuote = (quote: Quote) => {
    dispatch({ type: "SELECT_QUOTE", payload: quote });
  };
  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addProductToCart,
        removeProductFromCart,
        quoteProducts,
        setQuote,
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
