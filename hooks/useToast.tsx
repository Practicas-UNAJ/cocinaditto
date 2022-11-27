import { useContext } from "react";
import { ToastContext } from "../context/ToastProvider";

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context)
    throw new Error("useToast can only be used inside ToastProvider");

  return context;
};

export default useToast;
