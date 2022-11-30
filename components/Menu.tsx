import { Icon } from "@iconify/react";
import Router from "next/router";
import { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";
import { EModals } from "../enums/modals";
import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";
import useRandomRecipe from "../hooks/useRandom";
import { useWindowSize } from "../hooks/useWindowsSize";
import { UserDisplay } from "./UserDisplay";

interface IMenuProps {
  state: boolean;
  setState: () => void;
}

export const Menu: FunctionComponent<IMenuProps> = (props) => {
  const { setModal } = useModal();
  const { currentUser } = useAuth();
  const { height, ..._ } = useWindowSize();
  const { getRandom } = useRandomRecipe();

  const redirectTo = (endpoint: string) => Router.push(endpoint);

  return (
    <div
      className={twMerge(
        "fixed duration-300 z-30 right-0 flex flex-col gap-3 h-screen p-12 text-brown-900 font-semibold gradient drop-shadow-2xl",
        !props.state && "translate-x-full"
      )}
      style={{
        height: `${height}px`,
      }}
    >
      <button className="absolute top-5 left-7" onClick={props.setState}>
        <Icon icon="ep:close-bold" />
      </button>
      {currentUser ? (
        <>
          <div className="flex flex-col gap-3 h-full">
            <button
              onClick={() => redirectTo("/recipe/create")}
              className="text-shadow"
            >
              Publicar una receta
            </button>
            <button
              onClick={() => redirectTo("/recipe/featured")}
              className="text-shadow"
            >
              Recetas destacadas
            </button>
            <button
              onClick={() => redirectTo("/recipe/saved")}
              className="text-shadow"
            >
              Recetas guardadas
            </button>
            <button onClick={() => getRandom()} className="text-shadow">
              Receta aleatoria
            </button>
          </div>
          <UserDisplay />
        </>
      ) : (
        <>
          <button
            className="text-shadow"
            onClick={(ev) => {
              props.setState();
              setModal(ev, EModals.LOGIN);
            }}
          >
            Iniciar sesión
          </button>
          <button
            className="text-shadow"
            onClick={(ev) => {
              props.setState();
              setModal(ev, EModals.REGISTER);
            }}
          >
            Registrarse
          </button>
          <button
            onClick={() => redirectTo("/recipe/featured")}
            className="text-shadow"
          >
            Recetas destacadas
          </button>
          <button onClick={() => getRandom()} className="text-shadow">
            Receta aleatoria
          </button>
          <button className="text-shadow">Buscar recetas</button>
        </>
      )}
    </div>
  );
};
