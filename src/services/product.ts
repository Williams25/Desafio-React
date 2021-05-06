import { http } from "./index";

interface ProductSave {
  code?: number;
  name: string;
  price: string;
  category: string;
}

export default {
  findAll: () => {
    return http.get("/products");
  },
  create: ({ name, price, category }: ProductSave) => {
    return http.post("/products", {
      name,
      price: Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price)),
      category,
    });
  },
};
