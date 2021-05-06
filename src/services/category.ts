import { http } from "./index";

export default {
  findAll: () => {
    return http.get("/categories");
  },
};
