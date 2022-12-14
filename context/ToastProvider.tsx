import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Toast from "../components/Toast";
import { EToasts } from "../enums/toasts";
import { IToastContext } from "../interfaces/context";

export const ToastContext = createContext<IToastContext | null>(null);

const ToastProvider = ({ children }: PropsWithChildren<any>) => {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<EToasts | null>(null);

  const showToast = (toast: EToasts, message: string) => {
    setType(toast);
    setMessage(message);
    setShow(true);
  };

  const value: IToastContext = {
    showToast,
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), 3000);
      setTimeout(() => {
        setMessage("");
        setType(null);
      }, 3250);
    }
  }, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className={twMerge(
          "duration-300 fixed bottom-0 w-screen left-0 z-50",
          !show && "translate-y-full"
        )}
      >
        <Toast type={type as EToasts}>
          <p className="text-white font-medium text-xl">{message}</p>
        </Toast>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
