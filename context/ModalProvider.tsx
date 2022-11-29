import { createContext, PropsWithChildren, useState } from "react";
import { EModals } from "../enums/modals";
import { IModalContext } from "../interfaces/context";
import Modal, { ModalsProps } from "../components/Modal";

export const ModalContext = createContext<IModalContext | null>(null);

const ModalProvider = ({ children }: PropsWithChildren<any>) => {
  const [modal, setModalState] = useState<EModals | null>(null);
  const [props, setProps] = useState<ModalsProps>();

  const unsetModal = () => setModalState(null);

  const setModal = (ev: any, modal: EModals, props?: ModalsProps) => {
    setModalState(modal);
    setProps(props);
    ev.stopPropagation();
  };

  const value = {
    modal,
    setModal,
    unsetModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {modal && <Modal modal={modal} props={props} />}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
