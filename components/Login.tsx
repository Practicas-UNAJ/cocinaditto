import { Icon } from "@iconify/react";
import { NextComponentType } from "next";
import { CocinadittoInput } from "./Input";

export const Login: NextComponentType = () => {
    return (
        <div className="fixed top-0 left-0 grid justify-center items-center w-screen h-screen bg-black/40 z-10 backdrop-blur-sm">
            <div className="bg-gradient-radial from-primary-600 to-primary-800 relative flex flex-col gap-3 px-10 py-7 rounded-3xl">
                <Icon icon="akar-icons:circle-x" className="text-fuchsia-300 absolute right-5 top-5" />
                <CocinadittoInput label="Nombre de usuario:" type="text" />
                <CocinadittoInput label="Email:" type="email" />
                <CocinadittoInput label="Contraseña:" type="password" />
                <CocinadittoInput label="Confirmar contraseña:" type="password" />
            </div>
        </div>
    )
}