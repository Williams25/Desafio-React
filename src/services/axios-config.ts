import axios from "axios";

const URL = "http://localhost"
const PORT = 3333

const http = axios.create({
  baseURL: `${URL}:${PORT}`,
});

export { http };
