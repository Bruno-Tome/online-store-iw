"use client";
import React, { createContext } from "react";
import { CartProvider } from "./CartProvider";
import { ProductProvider } from "./ProductProvider";
import { UserProvider } from "./UserProvider";
import { NavbarProvider } from "./NavbarProvider";
import DataFetchingComponent from "./ProductDataFetching";
import { OrderProvider } from "./OrdersProvider";

interface ProviderWrapperProps {
  children: React.ReactNode;
}

const ProviderWrapper: React.FC<ProviderWrapperProps> = ({ children }) => {
  return (
    <NavbarProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <DataFetchingComponent />
            <OrderProvider>{children}</OrderProvider>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </NavbarProvider>
  );
};

export default ProviderWrapper;
