import { createContext, useContext, useEffect, useState } from "react";

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// Request interceptor to add Authorization header dynamically
import { InternalAxiosRequestConfig } from "axios";
import usePersistState from "../providers/usePersistState";
const BASE_URL = "http://localhost:3000";

interface ApiContextType {
  client: any;
  authApi: any;
  usersApi: any;
  productsApi: any;
  ordersApi: any;
}
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Define User Type
interface User {
  id: string;
  username: string;
  password: string;
  accessToken: string;
  roles: string[];
  profile?: Object;
}

// Define State Type
interface UserState {
  user: User;
}
// Initial State
const initialState: UserState = {
  user: {
    id: "",
    username: "",
    password: "",
    accessToken: "",
    roles: [],
    profile: {},
  },
};
export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData] = usePersistState("userData", initialState);
  const [authToken, setAuthToken] = useState(userData.user.accessToken); // Initial token
  useEffect(() => {
    setAuthToken(userData.user.accessToken);
  }, [userData]);

  const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  const [client, setClient] = useState<any>(apiClient.prototype);

  //   apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //     if (authToken) {
  //       config.headers.Authorization = `Bearer ${authToken}`;
  //     }
  //     return config;
  //   });

  //   // Response interceptor to handle JWT expiration
  //   apiClient.interceptors.response.use(
  //     (response: AxiosResponse) => response,
  //     async (error: any) => {
  //       const originalRequest = error.config;

  //       // If the error is due to an invalid token, attempt to refresh it
  //       if (
  //         error.response?.status === 401 &&
  //         !originalRequest._retry &&
  //         error.response.data.message === "TokenExpiredError"
  //       ) {
  //         originalRequest._retry = true;
  //         // const newToken = await refreshToken();
  //         apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
  //         originalRequest.headers.Authorization = `Bearer ${newToken}`;
  //         return apiClient(originalRequest);
  //       }

  //       return Promise.reject(error);
  //     },
  //   );
  const authApi = {
    login: async (email: string, password: string) => {
      const response = await apiClient.post("/auth/login", { email, password });

      setAuthToken(response.data.accessToken);
      return response;
    },
  };
  const usersApi = {
    getUsers: () => apiClient.get("/users"),
    getUserById: (userId: string) => apiClient.get(`/users/${userId}`),
    createUser: (user: {
      name: string;
      email: string;
      password: string;
      roles: string[];
    }) => apiClient.post("/users", user),
    updateUser: (userId: string, updatedFields: Record<string, any>) =>
      apiClient.patch(`/users/${userId}`, updatedFields),
    deleteUser: (userId: string) => apiClient.delete(`/users/${userId}`),
  };

  //   // Login function to refresh the token
  //   const refreshToken = async (): Promise<string> => {
  //       const response = await authApi.login(userData.user.username,userData.user.password);
  //     }
  //     setAuthToken(response.data.accessToken);
  //     return authToken;
  //   };
  const productsApi = {
    getProducts: () => apiClient.get("/products"),
    getProductById: (productId: string) =>
      apiClient.get(`/products/${productId}`),
    createProduct: (product: {
      name: string;
      description: string;
      price: number;
      images: string[];
      stock: number;
    }) => apiClient.post("/products", product),
    updateProduct: (productId: string, updatedFields: Record<string, any>) =>
      apiClient.patch(`/products/${productId}`, updatedFields),
    deleteProduct: (productId: string) =>
      apiClient.delete(`/products/${productId}`),
  };
  const ordersApi = {
    getOrders: () => apiClient.get("/orders"),
    getOrderById: (orderId: string) => apiClient.get(`/orders/${orderId}`),
    createOrder: (order: {
      customerId: string;
      items: { productId: string; quantity: number }[];
    }) => apiClient.post("/orders", order),
    getOrdersByCustomerId: (customerId: string) =>
      apiClient.get(`/orders/customer/${customerId}`),
  };
  useEffect(() => {}, []);

  return (
    <ApiContext.Provider
      value={{ client, authApi, usersApi, productsApi, ordersApi }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within a ApiProvider");
  }
  return context;
};
