import { Icon } from "@iconify/react";
import { NextComponentType } from "next";
import { MutableRefObject } from "react";
import { EModals } from "../enums/modals";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import useModal from "../hooks/useModal";
import useOutsideClick from "../hooks/useOutsideClick";
import useRegister from "../hooks/useRegister";
import { registerSchema } from "../modules/zod/schemas/Authentication";
import { CocinadittoInput } from "./Cocinaditto/Input";
interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const Register: NextComponentType = () => {
  const { unsetModal, setModal } = useModal();
  const { form, onChange, submit, errors, onError } = useForm<IRegisterForm>({
    schema: registerSchema,
  });
  const { register } = useRegister(onError);
  const { currentUser } = useAuth();

  const ref = useOutsideClick(unsetModal) as MutableRefObject<HTMLFormElement>;

  if (currentUser) unsetModal();

  const registerWrapper = () => {
    register({
      variables: {
        credentials: {
          ...form,
        },
      },
    });
  };

  return (
    <form
      ref={ref}
      className="bg-gradient-radial from-primary-700 to-primary-900 relative flex flex-col items-center gap-2 px-10 py-7 rounded-3xl"
      onSubmit={(ev: any) => submit({ ev, func: registerWrapper })}
    >
      <Icon
        icon="akar-icons:circle-x"
        className="text-fuchsia-300 absolute right-5 top-5"
        onClick={unsetModal}
      />
      <CocinadittoInput
        label="Nombre de usuario:"
        type="text"
        name="username"
        onChange={onChange}
        error={errors?.username}
      />
      <CocinadittoInput
        label="Email:"
        type="email"
        name="email"
        onChange={onChange}
        error={errors?.email}
      />
      <CocinadittoInput
        label="Contraseña:"
        type="password"
        name="password"
        onChange={onChange}
        error={errors?.password}
      />
      <CocinadittoInput
        label="Confirmar contraseña:"
        type="password"
        name="confirmPassword"
        onChange={onChange}
        error={errors?.confirmPassword}
      />
      <button className="text-primary-600 font-semibold bg-primary-900 py-2 px-5 rounded-full w-fit shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        Registrarse
      </button>
      <div className="font-normal text-xs text-white">
        ¿Ya <span className="font-semibold">tienes una cuenta</span>?{" "}
        <span onClick={(ev) => setModal(ev, EModals.LOGIN)}>
          Iniciar sesión
        </span>
      </div>
    </form>
  );
};
