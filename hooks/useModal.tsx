import { useContext } from "react";
import { ModalContext } from "../context/ModalProvider";

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error("useModal can only be used inside ModalProvider");

  return context;
};

export default useModal;
