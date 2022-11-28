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
  error?: string;
}

export const CocinadittoInput: FunctionComponent<IInputData> = ({
  label,
  className,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label className="flex flex-col items-center text-white">
        {label}
        <input
          {...props}
          className={twMerge(
            "text-black rounded-full py-1 px-3 shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]",
            className,
            error && "border-2 border-danger-900"
          )}
        />
      </label>
      {error && (
        <p className="relative left-1/2 -translate-x-1/2 text-center text-danger-900 text-sm w-full">
          {error}
        </p>
      )}
    </div>
  );
};
