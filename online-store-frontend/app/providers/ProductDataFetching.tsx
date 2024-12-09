import React, { useEffect } from "react";
import { useProductContext } from "./ProductProvider";
import { productsApi } from "../api/apiClient";

const DataFetchingComponent: React.FC = () => {
  const { dispatch } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getProducts();
        dispatch({ type: "SET_PRODUCTS", payload: response.data });
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return null; // No UI rendering
};

export default DataFetchingComponent;
