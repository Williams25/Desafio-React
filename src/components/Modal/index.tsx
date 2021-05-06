import { ReactNode } from "react";
import { ContainerModal } from "./styled";

interface ModalProps {
  children?: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <ContainerModal>
      <div className="content">{children}</div>
    </ContainerModal>
  );
};
