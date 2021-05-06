import { useContext, useState, ReactNode } from "react";
import { CategoryContext, ProductContext } from "../../contexts";
import { FormContent } from "./styled";
import { Loading, Header } from "../index";

interface FormProps {
  _id?: number;
  _name?: string;
  _price?: string;
  _category?: string;
  children: ReactNode;
}

export const Form = ({
  _category,
  _id,
  _name,
  _price,
  children,
}: FormProps) => {
  const { categories } = useContext(CategoryContext);
  const { handleToSaveProduct } = useContext(ProductContext);

  const [id, setId] = useState<number>(_id || undefined);
  const [name, setName] = useState<string>(_name || "");
  const [price, setPrice] = useState<string>(_price || "");
  const [category, setCategory] = useState<string>(_category || "");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const clearInput = () => {
    setId(undefined);
    setName("");
    setPrice("");
    setCategory("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim().length < 1 ||
      price.trim().length < 1 ||
      category.trim().length < 1 ||
      category === "Selecione uma categoria"
    ) {
      setMessage("Preencha os campos corretamente!");
      return;
    }

    handleToSaveProduct({ name, price, category });
    setLoading(true);
    clearInput();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            {children}
            <h1>{!id ? "Cadastrar produto" : "Alterar produto"}</h1>
          </Header>
          <FormContent method="post" onSubmit={handleSubmit}>
            <input
              type="number"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
              hidden
            />
            <label htmlFor="name">
              Nome
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label htmlFor="price">
              Preço
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <label htmlFor="category">
              Categoria
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Selecione uma categoria">
                  Selecione uma categoria
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <button type="submit">Salvar</button>
            <span>{message}</span>
          </FormContent>
        </>
      )}
    </div>
  );
};
