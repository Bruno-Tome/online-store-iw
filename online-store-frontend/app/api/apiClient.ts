import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Request interceptor to add Authorization header dynamically
import { InternalAxiosRequestConfig } from "axios";
const BASE_URL = "http://localhost:3000";

let authToken = ""; // Initial token

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  },
});

// Login function to refresh the token
const refreshToken = async (): Promise<string> => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email: "john.doe4@example.com",
    password: "password123",
  });
  authToken = response.data.token;
  return authToken;
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Response interceptor to handle JWT expiration
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    const originalRequest = error.config;

    // If the error is due to an invalid token, attempt to refresh it
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message === "TokenExpiredError"
    ) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  },
);

// Auth Routes
export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post("/auth/login", { email, password }),
};

// Users Routes
export const usersApi = {
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

// Products Routes
export const productsApi = {
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

// Orders Routes
export const ordersApi = {
  getOrders: () => apiClient.get("/orders"),
  getOrderById: (orderId: string) => apiClient.get(`/orders/${orderId}`),
  createOrder: (order: {
    customerId: string;
    items: { productId: string; quantity: number }[];
  }) => apiClient.post("/orders", order),
  getOrdersByCustomerId: (customerId: string) =>
    apiClient.get(`/orders/customer/${customerId}`),
};
export default apiClient;
