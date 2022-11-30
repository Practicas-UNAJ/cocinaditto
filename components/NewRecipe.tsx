import { NextComponentType } from "next";
import Ditto from "../assets/images/ditto-espatula.png";
import Image from "next/image";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import { EModals } from "../enums/modals";

export const NewRecipe: NextComponentType = () => {
  const { currentUser } = useAuth();
  const { setModal } = useModal();
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center self-center"
      onClick={(ev) => {
        if (currentUser) router.push("/recipe/create");
        else setModal(ev, EModals.LOGIN);
      }}
    >
      <div className="text-center text-2xl ">¡Publica una receta!</div>
      <div className="w-40 relative">
        <Image src={Ditto} objectFit="cover" layout="responsive" />
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 secondary-button-gradient border-2 border-black rounded-lg px-5 text-white text-xl">
          Publicar
        </button>
      </div>
    </div>
  );
};
