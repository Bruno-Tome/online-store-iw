import React, { useEffect, useMemo } from "react";
import { useProductContext } from "./ProductProvider";
import { productsApi } from "../api/apiClient";

const DataFetchingComponent: React.FC = () => {
  const { fetchProducts } = useProductContext();

  useMemo(() => {
    fetchProducts();
  }, []);

  return null; // No UI rendering
};

export default DataFetchingComponent;
