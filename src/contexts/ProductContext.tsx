import { createContext, ReactNode, useState, useEffect } from "react";
import { product } from "../services";

interface ProductContextData {
  handleToSaveProduct: ({ name, price, category, code }: ProductSave) => void;
  handleToUpdateProduct: ({
    name,
    price,
    category,
    code,
    id,
  }: ProductSave) => void;
  productExists: ({ collunm, value }) => void;
  loadingProducts: () => void;
  removeProdut: ({ id }) => void;
  toHaveProduct: ProductSave[];
  productsList: ProductSave[];
}

interface ProductProviderProps {
  children: ReactNode;
}

interface ProductSave {
  id?: number;
  name: string;
  price: string;
  category: string;
  code: number;
}

export const ProductContext = createContext({} as ProductContextData);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [toHaveProduct, setToHaveProduct] = useState<ProductSave[]>([]);
  const [productsList, setProductsList] = useState<ProductSave[]>([]);

  const loadingProducts = () => {
    product
      .findAll()
      .then((res) => {
        const { data } = res;
        setProductsList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const productExists = ({ collunm, value }) => {
    product
      .findByCollunm(collunm, value)
      .then((res) => {
        const { data } = res;
        setToHaveProduct(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleToSaveProduct = ({
    name,
    price,
    category,
    code,
  }: ProductSave) => {
    product
      .create({ name, price, category, code })
      .then((res) => {
        loadingProducts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleToUpdateProduct = ({
    name,
    price,
    category,
    code,
    id,
  }: ProductSave) => {
    product
      .update({ name, price, category, code, id })
      .then((res) => {
        loadingProducts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeProdut = ({ id }) => {
    console.log("context ", id);
    product
      .delete({ id })
      .then((res) => {
        loadingProducts();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        handleToSaveProduct,
        productExists,
        toHaveProduct,
        productsList,
        loadingProducts,
        handleToUpdateProduct,
        removeProdut,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
