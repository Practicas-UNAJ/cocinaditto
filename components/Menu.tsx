import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";
import { EModals } from "../enums/modals";
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";
import { UserDisplay } from "./UserDisplay";

interface IMenuProps {
  state: boolean
  setState: () => void;
}

export const Menu: FunctionComponent<IMenuProps> = (props) => {
  const { setModal } = useModal();
  const { currentUser } = useAuth();

  return (
    <div className={twMerge("fixed duration-300 z-20 right-0 flex flex-col gap-3 h-screen p-12 text-brown-900 font-semibold gradient drop-shadow-2xl", !props.state && "translate-x-full")}>
      <button className="absolute top-5 left-7" onClick={props.setState}>
        <Icon icon="ep:close-bold" />
      </button>
      {currentUser ? (
        <>
          <div className="flex flex-col gap-3 h-full">
            <button className="text-shadow">Publicar una receta</button>
            <button className="text-shadow">Publicaciones destacadas</button>
            <button className="text-shadow">Receta aleatoria</button>
            <button className="text-shadow">Seguidos</button>
          </div>
          <UserDisplay/>
        </>
      ) : (
        <>
          <button
            className="text-shadow"
            onClick={() => setModal(EModals.LOGIN)}
          >
            Iniciar sesión
          </button>
          <button
            className="text-shadow"
            onClick={() => setModal(EModals.REGISTER)}
          >
            Registrarse
          </button>
          <button className="text-shadow">Publicaciones destacadas</button>
          <button className="text-shadow">Receta aleatoria</button>
          <button className="text-shadow">Buscar recetas</button>
        </>
      )}
    </div>
  );
};
