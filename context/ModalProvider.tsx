import { createContext, PropsWithChildren, useState } from "react";
import { EModals } from "../enums/modals";
import { IModalContext } from "../interfaces/context";
import Modal from "../components/Modal";

export const ModalContext = createContext<IModalContext | null>(null);

const ModalProvider = ({ children }: PropsWithChildren<any>) => {
  const [modal, setModalState] = useState<EModals | null>(null);

  const unsetModal = () => setModalState(null);
  const setModal = (modal: EModals) => setModalState(modal);

  const value = {
    modal,
    setModal,
    unsetModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {modal && <Modal modal={modal} />}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
