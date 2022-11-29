import { FunctionComponent, ReactNode } from "react";
import { EModals } from "../enums/modals";
import { Delete, IDeleteProps } from "./Delete";
import { Login } from "./Login";
import { Register } from "./Register";

export type ModalsProps = IDeleteProps;

interface IModalProps {
  modal: EModals;
  props?: ModalsProps;
}

const getModal = (modal: EModals, props?: ModalsProps) => {
  switch (modal) {
    case EModals.LOGIN:
      return <Login />;
    case EModals.REGISTER:
      return <Register />;
    case EModals.DELETE:
      return <Delete {...(props as IDeleteProps)} />;
  }
};

const Modal: FunctionComponent<IModalProps> = ({ modal, props }) => {
  return (
    <div className="fixed top-0 left-0 grid justify-center items-center w-screen h-screen bg-black/40 z-10 backdrop-blur-sm">
      {getModal(modal, props)}
    </div>
  );
};

export default Modal;
