import { Icon } from "@iconify/react";
import { NextComponentType } from "next";
import useModal from "../hooks/useModal";
import { CocinadittoInput } from "./Cocinaditto/Input";

export const Login: NextComponentType = () => {
    const { unsetModal } = useModal();
    
    return (
        <div className="bg-gradient-radial from-primary-700 to-primary-900 relative flex flex-col items-center gap-2 px-10 py-7 rounded-3xl">
            <Icon icon="akar-icons:circle-x" className="text-fuchsia-300 absolute right-5 top-5" onClick={unsetModal} />
            <CocinadittoInput label="Nombre de usuario:" type="text" />
            <CocinadittoInput label="Contraseña:" type="password" />
            <button className="text-primary-600 font-semibold bg-primary-900 py-2 px-5 rounded-full w-fit shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">Iniciar sesión</button>
            <div className="font-normal text-xs text-white">¿<span className="font-semibold">No tienes</span> una cuenta? Registrarse</div>
        </div>
    )
}