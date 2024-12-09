"use client";
import React, { createContext, memo } from "react";
import { ProductProvider } from "./ProductProvider";
import { UserProvider } from "./UserProvider";
import { NavbarProvider } from "./NavbarProvider";
import DataFetchingComponent from "./ProductDataFetching";
import { OrderProvider } from "./OrdersProvider";
import CartProvider from "./CartProvider";

interface ProviderWrapperProps {
  children: React.ReactNode;
}

const ProviderWrapper: React.FC<ProviderWrapperProps> = ({ children }) => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <DataFetchingComponent />
          <OrderProvider>
            <NavbarProvider>{children}</NavbarProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default memo(ProviderWrapper);
