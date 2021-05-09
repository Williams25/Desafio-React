import { ReactNode, useState } from "react";
import { ContainerModal } from "./styled";
import { Button, IconButton } from "@material-ui/core";
import { Form } from "../Form";
import { CategoryProvider } from "../../contexts";

interface ModalProps {
  children?: ReactNode;
  icon: () => JSX.Element;
}

export const ModalFormCreate = ({ icon }: ModalProps) => {
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
                activeAndDisabledModal={() => {
                  activeAndDisabledModal();
                }}
              />
            </div>
          </div>
        </ContainerModal>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          activeAndDisabledModal();
        }}
      >
        Cadastrar produto
        {icon()}
      </Button>
    </CategoryProvider>
  );
};
