import { NextComponentType } from "next";
import Image from "next/image";
import Ditto from "../assets/images/ditto-duda.png";

export const RandomRecipe: NextComponentType = () => {
  return (
    <div className="flex flex-row gap-3 self-center">
      <div className="w-40 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <Image src={Ditto} objectFit="cover" layout="responsive" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-col text-center text-2xl">
          <span>¿No sabes qué cocinar?</span>
          <span>¡Te ayudamos!</span>
        </div>
        <button className="secondary-button-gradient text-white w-fit py-1 px-3 rounded-md shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          Receta Aleatoria
        </button>
      </div>
    </div>
  );
};
