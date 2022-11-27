import { FunctionComponent, ReactNode } from "react";
import { EModals } from "../enums/modals";
import { Delete } from "./Delete";
import { Login } from "./Login";
import { Register } from "./Register";

interface IModalProps {
  modal: EModals;
}

const modals: Record<EModals, ReactNode> = {
  LOGIN: <Login />,
  REGISTER: <Register />,
  DELETE: <Delete />,
};

const Modal: FunctionComponent<IModalProps> = ({ modal }) => {
  return (
    <div className="fixed top-0 left-0 grid justify-center items-center w-screen h-screen bg-black/40 z-10 backdrop-blur-sm">
      {modals[modal]}
    </div>
  );
};

export default Modal;
