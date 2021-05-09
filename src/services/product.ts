import { http } from "./index";

interface ProductSave {
  id?: number;
  code: number;
  name: string;
  price: string;
  category: string;
}

export default {
  findAll: async () => {
    return await http.get("/products");
  },
  create: async ({ name, price, category, code }: ProductSave) => {
    return await http.post("/products", {
      name,
      price,
      category,
      code,
    });
  },
  findByCollunm: async (collunm, value) => {
    return await http.get(`/products?${collunm}=${value}`);
  },
  update: async ({ name, price, category, code, id }: ProductSave) => {
    return await http.put(`/products/${id}`, { name, price, category, code });
  },
  delete: ({ id }) => {
    console.log("service", id);
    return http.delete(`/products/${id}`);
  },
};
