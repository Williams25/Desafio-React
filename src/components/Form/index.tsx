import { useContext, useState, ReactNode } from "react";
import { CategoryContext, ProductContext } from "../../contexts";
import { FormContent } from "./styled";
import { Loading, Header } from "../index";

interface FormProps {
  _id?: number;
  _name?: string;
  _price?: string;
  _category?: string;
  _code?: number;
  children?: ReactNode;
  activeAndDisabledModal?: () => void;
}

export const Form = ({
  _category,
  _id,
  _name,
  _price,
  _code,
  activeAndDisabledModal,
  children,
}: FormProps) => {
  const { categories } = useContext(CategoryContext);
  const {
    handleToSaveProduct,
    productExists,
    handleToUpdateProduct,
    productsList,
  } = useContext(ProductContext);

  const [id, setId] = useState<number>(_id || undefined);
  const [code, setCode] = useState<string>(String(_code) || "");
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
    productExists({ collunm: "code", value: code });

    const list = productsList.filter((p) => p.code == Number(code));

    if (!id && list.length === 0) {
      handleToSaveProduct({
        name,
        price,
        category,
        code:Number(code),
      });
    } else if (id && list.length === 0) {
      handleToUpdateProduct({
        name,
        price,
        category,
        code:Number(code),
        id,
      });
    } else if (list[0].code === Number(code) && list[0].id === id) {
      handleToUpdateProduct({
        name,
        price,
        category,
        code: Number(code),
        id,
      });
    } else {
      setMessage("Código do SKU já está cadastrado");
      return;
    }
    setLoading(true);
    clearInput();
    setTimeout(() => {
      setLoading(false);
      activeAndDisabledModal();
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
            <label htmlFor="code">
              SKU
              <input
                type="number"
                id="code"
                value={code}
                required
                onChange={(e) => setCode(e.target.value)}
              />
            </label>

            <label htmlFor="name">
              Nome
              <input
                type="text"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label htmlFor="price">
              Preço
              <input
                type="text"
                id="price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <label htmlFor="category">
              Categoria
              <select
                name="category"
                id="category"
                value={category}
                required
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
