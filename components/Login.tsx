import { Icon } from "@iconify/react";
import { NextComponentType } from "next";
import { MutableRefObject } from "react";
import { EModals } from "../enums/modals";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import useLogin from "../hooks/useLogin";
import useModal from "../hooks/useModal";
import useOutsideClick from "../hooks/useOutsideClick";
import { CocinadittoInput } from "./Cocinaditto/Input";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login: NextComponentType = () => {
  const { unsetModal, setModal } = useModal();
  const { form, onChange, submit } = useForm<ILoginForm>({});
  const { login } = useLogin();
  const { currentUser } = useAuth();

  const ref = useOutsideClick(unsetModal) as MutableRefObject<HTMLFormElement>;

  if (currentUser) unsetModal();

  const loginWrapper = () => {
    login({
      variables: {
        credentials: {
          email: form.email,
          password: form.password,
        },
      },
    });
  };

  return (
    <form
      ref={ref}
      className="bg-gradient-radial from-primary-700 to-primary-900 relative flex flex-col items-center gap-2 px-10 py-7 rounded-3xl"
      onSubmit={(ev: any) => submit({ ev, func: loginWrapper })}
    >
      <Icon
        icon="akar-icons:circle-x"
        className="text-fuchsia-300 absolute right-5 top-5"
        onClick={unsetModal}
      />
      <CocinadittoInput
        label="Email:"
        name="email"
        type="email"
        onChange={onChange}
      />
      <CocinadittoInput
        label="Contraseña:"
        name="password"
        type="password"
        onChange={onChange}
      />
      <button className="text-primary-600 font-semibold bg-primary-900 py-2 px-5 rounded-full w-fit shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        Iniciar sesión
      </button>
      <div className="font-normal text-xs text-white">
        ¿<span className="font-semibold">No tienes</span> una cuenta?{" "}
        <span onClick={(ev) => setModal(ev, EModals.REGISTER)}>
          Registrarse
        </span>
      </div>
    </form>
  );
};
