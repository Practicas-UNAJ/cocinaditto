import { NextComponentType } from "next";

export const Navbar = () => {
    return (
        <nav className="flex flex-row justify-center bg-gradient-radial from-primary-600 to-primary-700 shadow shadow-primary-800 w-screen">
            <h1 className="text-black text-2xl">Cocinaditto</h1>
        </nav>
    )
}