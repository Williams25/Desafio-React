import { ReactNode, useState, useContext } from "react";
import { Loading } from "../index";
import { ContainerModal } from "./styled";
import { IconButton, Button } from "@material-ui/core";
import { CategoryProvider, ProductContext } from "../../contexts";

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

export const ModalDelete = ({
  children,
  isModalActive,
  data,
  activeAndDisabledModal,
}: ModalFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { removeProdut } = useContext(ProductContext);

  const removeToProduct = (id) => {
    console.log('delete ', id)
    removeProdut({ id });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      activeAndDisabledModal();
    }, 3000);
  };

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
            {loading ? (
              <Loading />
            ) : (
              <div className="wrapper-delete">
                <h3>Deseja apagar o produto ({data.name})?</h3>
                <div className="content-button">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      removeToProduct(data.id);
                    }}
                  >
                    Apagar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={activeAndDisabledModal}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ContainerModal>
      )}
    </CategoryProvider>
  );
};
