import { ReactNode, useState } from "react";
import { ContainerModal } from "./styled";
import { Button, IconButton } from "@material-ui/core";
import { Form } from "../Form";
import { CategoryProvider } from "../../contexts";

interface ModalProps {
  children?: ReactNode;
  data?: {
    id?: string;
    code?: string;
    name?: string;
    price?: string;
    category?: string;
  };
  icon: () => JSX.Element;
}

export const ModalFormCreate = ({
  data,
  icon,
}: ModalProps) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const activeAndDisabledModal = () => setIsModalActive(!isModalActive);

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
                _id={Number(data?.id)}
                _code={Number(data?.code)}
                _name={data?.name}
                _price={data?.price}
                _category={data?.category}
                activeAndDisabledModal={() => {
                  activeAndDisabledModal();
                }}
              />
            </div>
          </div>
        </ContainerModal>
      )}
      <IconButton
        size="small"
        onClick={() => {
          activeAndDisabledModal();
        }}
      >
        {icon()}
      </IconButton>
    </CategoryProvider>
  );
};
