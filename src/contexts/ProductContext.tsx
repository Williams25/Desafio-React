import { createContext, ReactNode, useState, useEffect } from "react";
import { product } from "../services";

interface ProductContextData {
  handleToSaveProduct: ({ name, price, category }: ProductSave) => void;
}

interface ProductProviderProps {
  children: ReactNode;
}

interface ProductSave {
  id?: number;
  name: string;
  price: string;
  category: string;
}

export const ProductContext = createContext({} as ProductContextData);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const handleToSaveProduct = ({ name, price, category }: ProductSave) => {
    product
      .create({ name, price, category })
      .then((res) => {
        const { data } = res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ProductContext.Provider value={{ handleToSaveProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
