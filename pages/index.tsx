import styled from "styled-components";
import { product } from "../src/services";
import { useState, useEffect } from "react";
import { ModalForm } from "../src/components";

export default function Home() {
  const [products, setProducts] = useState([]);

  const loadingProducts = () => {
    product
      .findAll()
      .then((res) => {
        const { data } = res;
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadingProducts();
  }, []);

  return (
    <div>
      {JSON.stringify(products)}
      <ModalForm />
    </div>
  );
}
