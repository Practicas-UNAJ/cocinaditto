import {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

interface IInputData
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: {
    message?: string;
  };
}

export const CocinadittoInput: FunctionComponent<IInputData> = ({
  label,
  className,
  error,
  ...props
}) => {
  return (
    <label className="flex flex-col items-center text-white">
      {label}
      <input
        {...props}
        className={twMerge(
          "text-black rounded-full py-1 px-3 shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]",
          className
        )}
      />
    </label>
  );
};
