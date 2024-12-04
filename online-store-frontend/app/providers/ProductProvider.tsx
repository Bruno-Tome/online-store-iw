import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { productsApi } from '../api/apiClient';

interface Product {
    _id: number;
    description: string;
    images: string[];
    stock: number;
    name: string;
    price: number;
}

interface ProductContextType {
    products: Product[];
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product) => void;
    setProducts: (products: Product[]) => void; // Expose setProducts for the DataFetchingComponent
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <ProductContext.Provider
            value={{ products, selectedProduct, setSelectedProduct, setProducts }}
        >

            {children}
        </ProductContext.Provider>
    );
};
export { ProductProvider, ProductContext };


