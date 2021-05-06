import { useState, ReactNode } from "react";
import { Form, Modal } from "../index";
import { CategoryProvider, ProductProvider } from "../../contexts";

export const ModalForm = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(true);

  const activeAndDisabledModal = () => setIsModalActive(!isModalActive);

  return (
    <ProductProvider>
      <CategoryProvider>
        {isModalActive && (
          <Modal>
            <Form>
              <button onClick={activeAndDisabledModal}>
                <img src="/icons/close.svg" alt="fechar" />
              </button>
            </Form>
          </Modal>
        )}
      </CategoryProvider>
    </ProductProvider>
  );
};
