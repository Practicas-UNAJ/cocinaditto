import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import { EModals } from "../enums/modals";
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";

interface IMenuProps {
  setState: () => void;
}

export const Menu: FunctionComponent<IMenuProps> = (props) => {
  const { setModal } = useModal();
  const { currentUser } = useAuth();

  return (
    <div className="fixed z-20 right-0 flex flex-col gap-3 h-screen p-12 text-brown-900 font-semibold gradient drop-shadow-2xl">
      <button className="absolute top-5 left-7" onClick={props.setState}>
        <Icon icon="ep:close-bold" />
      </button>
      {currentUser ? (
        <>
          <button className="text-shadow">Tu perfil</button>
          <button className="text-shadow">Editar perfil</button>
          <button className="text-shadow">Publicar una receta</button>
          <button className="text-shadow">Publicaciones destacadas</button>
          <button className="text-shadow">Receta aleatoria</button>
          <button className="text-shadow">Seguidos</button>
          <button className="text-shadow">Cerrar sesión</button>
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
