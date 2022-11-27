import { FunctionComponent, PropsWithChildren } from "react";
import { EToasts } from "../enums/toasts";

interface ToastProps extends PropsWithChildren {
  type: EToasts;
}

const Toast: FunctionComponent<ToastProps> = ({ type, children }) => {
  const className =
    "relative -translate-x-1/2 left-1/2 flex flex-col duration-300 justify-center items-center rounded-t-xl h-20 w-1/4";
  switch (type) {
    case EToasts.SUCCESS: {
      return (
        <div
          className={className}
          style={{
            background: "linear-gradient(104.04deg, #0EB379 0%, #067967 100%)",
          }}
        >
          {children}
        </div>
      );
    }
    case EToasts.FAILURE: {
      return (
        <div
          className={className}
          style={{
            background: "linear-gradient(104.04deg, #DB4149 0%, #931C37 100%)",
          }}
        >
          {children}
        </div>
      );
    }
    default: {
      return <></>;
    }
  }
};

export default Toast;
