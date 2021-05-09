import { useContext, useState, ReactNode } from "react";
import { CategoryContext, ProductContext } from "../../contexts";
import { FormContent } from "./styled";
import { Loading, Header } from "../index";
import { useForm } from "react-hook-form";
import { formatMaskCoinBR } from "../../masks";

interface FormProps {
  data?: Inputs;
  children?: ReactNode;
  activeAndDisabledModal?: () => void;
}

interface Inputs {
  id?: number;
  name?: string;
  price?: string;
  category?: string;
  code?: number;
}

export const Form = ({ data, activeAndDisabledModal, children }: FormProps) => {
  const { categories } = useContext(CategoryContext);
  const {
    handleToSaveProduct,
    productExists,
    handleToUpdateProduct,
    productsList,
  } = useContext(ProductContext);

  const [id, setId] = useState<number>(data?.id || undefined);
  const [code, setCode] = useState<string>(String(data?.code) || "");
  const [name, setName] = useState<string>(data?.name || "");
  const [price, setPrice] = useState<string>(data?.price || "");
  const [category, setCategory] = useState<string>(data?.category || "");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const clearInput = () => {
    setId(undefined);
    setCode("");
    setName("");
    setPrice("");
    setCategory("");
    setMessage("");
  };

  const handleSubmitForm = (data: Inputs) => {
    console.log("data ", data);
    productExists({ collunm: "code", value: code });

    const list = productsList.filter((p) => p.code == Number(data.code));

    if (!id && list.length === 0) {
      handleToSaveProduct({
        name: data.name,
        price: price,
        category: data.category,
        code: Number(data.code),
      });
    } else if (id && list.length === 0) {
      handleToUpdateProduct({
        name: data.name,
        price: price,
        category: data.category,
        code: Number(data.code),
        id: data.id,
      });
    } else if (list[0].code === Number(code) && list[0].id === id) {
      handleToUpdateProduct({
        name: data.name,
        price: price,
        category: data.category,
        code: Number(data.code),
        id: data.id,
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
          <FormContent method="post" onSubmit={handleSubmit(handleSubmitForm)}>
            <input type="number" defaultValue={id} {...register("id")} hidden />
            <label htmlFor="code">
              SKU
              <input
                type="number"
                defaultValue={code}
                {...register("code", { required: true })}
              />
            </label>

            <label htmlFor="name">
              Nome
              <input
                type="text"
                id="name"
                defaultValue={name}
                {...register("name", { required: true })}
              />
            </label>

            <label htmlFor="price">
              Preço
              <input
                type="text"
                value={price == "R$ NaN" ? "R$ 00,00" : price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyUp={(e) => setPrice(formatMaskCoinBR(e))}
              />
            </label>

            <label htmlFor="category">
              Categoria
              <select
                name="category"
                id="category"
                defaultValue={category}
                {...register("category", { required: true })}
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
