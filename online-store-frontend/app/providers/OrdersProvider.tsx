"use client";

import React, { createContext, ReactNode, useReducer, useContext } from "react";
import { ordersApi } from "../api/apiClient";

// Order Item and Order Types
interface OrderItem {
  productId: string;
  quantity: number;
}

interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
}

type OrderAction =
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "SET_SELECTED_ORDER"; payload: Order | null }
  | { type: "ADD_ORDER"; payload: Order };

// Initial State
const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
};

// Reducer Function
const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload };
    case "SET_SELECTED_ORDER":
      return { ...state, selectedOrder: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Context Interface
interface OrderContextType {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<void>;
  fetchOrdersByCustomerId: (customerId: string) => Promise<void>;

  createOrder: (order: {
    customerId: string;
    items: OrderItem[];
  }) => Promise<void>;
}

// Create Context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Fetch All Orders
  const fetchOrders = async () => {
    try {
      const response = await ordersApi.getOrders();
      dispatch({ type: "SET_ORDERS", payload: response.data });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch Order by ID
  const fetchOrderById = async (orderId: string) => {
    try {
      const response = await ordersApi.getOrderById(orderId);
      dispatch({ type: "SET_SELECTED_ORDER", payload: response.data });
    } catch (error) {
      console.error("Error fetching order by ID:", error);
    }
  };

  // Create a New Order
  const createOrder = async (order: {
    customerId: string;
    items: OrderItem[];
  }) => {
    try {
      const response = await ordersApi.createOrder(order);
      dispatch({ type: "ADD_ORDER", payload: response.data });
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Fetch Orders by Customer ID
  const fetchOrdersByCustomerId = async (customerId: string) => {
    try {
      const response = await ordersApi.getOrdersByCustomerId(customerId);
      dispatch({ type: "SET_ORDERS", payload: response.data });
    } catch (error) {
      console.error("Error fetching orders by customer ID:", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        fetchOrders,
        fetchOrderById,
        createOrder,
        fetchOrdersByCustomerId,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom Hook for Consuming Context
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
// Usage in components
// import React from "react";
// import ReactDOM from "react-dom";
// import { OrderProvider } from "./context/OrderContext";
// import App from "./App";

// ReactDOM.render(
//   <OrderProvider>
//     <App />
//   </OrderProvider>,
//   document.getElementById("root")
// );

// Examples of Using the Order Context
// Fetch All Orders
// tsx
// Copy code
// import React, { useEffect } from "react";
// import { useOrderContext } from "./context/OrderContext";

// const OrdersList: React.FC = () => {
//   const { state, fetchOrders } = useOrderContext();

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   return (
//     <div>
//       <h1>Orders</h1>
//       <ul>
//         {state.orders.map((order) => (
//           <li key={order.id}>
//             <strong>Order ID:</strong> {order.id}, <strong>Customer:</strong>{" "}
//             {order.customerId}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OrdersList;
