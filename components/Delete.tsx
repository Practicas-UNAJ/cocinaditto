import { NextComponentType } from "next";
import { MutableRefObject } from "react";
import useModal from "../hooks/useModal";
import useOutsideClick from "../hooks/useOutsideClick";

export const Delete: NextComponentType = () => {
  const { unsetModal } = useModal();
  const ref = useOutsideClick(unsetModal) as MutableRefObject<HTMLDivElement>;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center max-w-xs text-center card-gradient rounded-2xl py-3 text-brown-900 font-semibold"
    >
      <span>
        Estás por eliminar una receta, esta acción no puede revertirse.
      </span>
      <span>¿Quieres continuar de todos modos?</span>
      <div className="flex flex-row gap-2">
        <button className="rounded-full p-3 bg-danger-800 text-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          Eliminar
        </button>
        <button className="rounded-full p-3 border-2 border-brown-900">
          Cancelar
        </button>
      </div>
    </div>
  );
};
