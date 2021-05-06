import { createContext, ReactNode, useState, useEffect } from "react";
import { category } from "../services";

interface Category {
  id: number;
  name: string;
}

interface CategoryContextData {
  categories: Category[];
}

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryContext = createContext({} as CategoryContextData);

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadingCategories = () => {
    category
      .findAll()
      .then((res) => {
        const { data } = res;
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadingCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
