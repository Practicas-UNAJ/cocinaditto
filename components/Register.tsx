import { Icon } from "@iconify/react";
import { NextComponentType } from "next";
import { CocinadittoInput } from "./Cocinaditto/Input";

export const Register: NextComponentType = () => {
    return (
        <div className="fixed top-0 left-0 grid justify-center items-center w-screen h-screen bg-black/40 z-10 backdrop-blur-sm">
            <div className="bg-gradient-radial from-primary-700 to-primary-900 relative flex flex-col items-center gap-2 px-10 py-7 rounded-3xl">
                <Icon icon="akar-icons:circle-x" className="text-fuchsia-300 absolute right-5 top-5" />
                <CocinadittoInput label="Nombre de usuario:" type="text" />
                <CocinadittoInput label="Email:" type="email" />
                <CocinadittoInput label="Contraseña:" type="password" />
                <CocinadittoInput label="Confirmar contraseña:" type="password" />
                <button className="text-primary-600 font-semibold bg-primary-900 py-2 px-5 rounded-full w-fit shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">Registrarse</button>
                <div className="font-normal text-xs text-white">¿Ya <span className="font-semibold">tienes una cuenta</span>? Iniciar sesión</div>
            </div>
        </div>
    )
}