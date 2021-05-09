import { ReactNode } from "react";
import { Form } from "../index";
import { ContainerModal } from "./styled";
import { IconButton } from "@material-ui/core";
import { CategoryProvider } from "../../contexts";

interface ModalFormProps {
  children?: ReactNode;
  isModalActive: boolean;
  data?: {
    id?: number;
    code?: string;
    name?: string;
    price?: string;
    category?: string;
  };
  activeAndDisabledModal: () => void;
}

export const ModalFormUpdate = ({
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
            <div className="wrapper">
              <Form
                data={{
                  category: data.category,
                  code: Number(data.code),
                  id: data.id,
                  name: data.name,
                  price: data.price,
                }}
                activeAndDisabledModal={() => {
                  activeAndDisabledModal();
                }}
              ></Form>
            </div>
          </div>
        </ContainerModal>
      )}
    </CategoryProvider>
  );
};
