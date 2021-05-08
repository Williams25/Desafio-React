import { ReactNode } from "react";
import { ContainerModal } from "./styled";
import { IconButton } from "@material-ui/core";
import { CategoryProvider } from "../../contexts";

interface ModalFormProps {
  children?: ReactNode;
  isModalActive: boolean;
  data?: {
    id?: string;
    code?: string;
    name?: string;
    price?: string;
    category?: string;
  };
  activeAndDisabledModal: () => void;
}

export const ModalViewProduct = ({
  children,
  isModalActive,
  data,
  activeAndDisabledModal,
}: ModalFormProps) => {
  return (
    <CategoryProvider>
      {isModalActive && (
        <ContainerModal>
          <div className="content">
            <IconButton
              className="close-modal"
              size="small"
              onClick={activeAndDisabledModal}
            >
              <img src="/icons/close.svg" alt="fechar" />
            </IconButton>
            <div className="wrapper-view_product">
              <h1>Detalhes</h1>
              <div className="details">
                <span>
                  <strong>SKU:</strong> {data.code}
                </span>
                <span>
                  <strong>Nome:</strong> {data.name}
                </span>
                <span>
                  <strong>Preço:</strong> {data.price}
                </span>
                <span>
                  <strong>Categoria:</strong> {data.category}
                </span>
              </div>
            </div>
          </div>
        </ContainerModal>
      )}
    </CategoryProvider>
  );
};
