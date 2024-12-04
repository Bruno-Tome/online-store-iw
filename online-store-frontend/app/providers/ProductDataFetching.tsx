import React, { useEffect } from 'react';
import { useContext } from 'react';
import { productsApi } from '../api/apiClient';
import { ProductContext } from './ProductProvider';

const DataFetchingComponent: React.FC = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('DataFetchingComponent must be used within a ProductProvider');
    }

    const { products,setProducts } = context;

    useEffect(() => {
        console.log(products)  
        const fetchProducts = async () => {
            try {
                const response = await productsApi.getProducts();
                setProducts(response.data);
                // console.log(response.data)
                // console.log(setProducts)
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        
        fetchProducts();

    }, []);

    return null; // This component doesn't render anything
};

export default DataFetchingComponent;
