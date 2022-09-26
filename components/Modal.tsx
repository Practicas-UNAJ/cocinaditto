import { FunctionComponent, ReactNode } from "react";
import { EModals } from "../enums/modals";
import { Register } from "./Register";

interface IModalProps {
  modal: EModals;
}

const modals: Record<EModals, ReactNode> = {
  LOGIN: <h1>Login</h1>,
  REGISTER: <Register />,
};

const Modal: FunctionComponent<IModalProps> = ({ modal }) => {
  return (
    <div className="fixed top-0 left-0 grid justify-center items-center w-screen h-screen bg-black/40 z-10 backdrop-blur-sm">
      {modals[modal]}
    </div>
  );
};

export default Modal;
