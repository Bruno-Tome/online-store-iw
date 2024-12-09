"use client";
import React, { createContext } from "react";
import { CartProvider } from "./CartProvider";
import { ProductProvider } from "./ProductProvider";
import { UserProvider } from "./UserProvider";
import { NavbarProvider } from "./NavbarProvider";
import DataFetchingComponent from "./ProductDataFetching";

interface ProviderWrapperProps {
  children: React.ReactNode;
}

const ProviderWrapper: React.FC<ProviderWrapperProps> = ({ children }) => {
  return (
    <NavbarProvider>
      <CartProvider>
        <ProductProvider>
          <DataFetchingComponent />
          <UserProvider>{children}</UserProvider>
        </ProductProvider>
      </CartProvider>
    </NavbarProvider>
  );
};

export default ProviderWrapper;
