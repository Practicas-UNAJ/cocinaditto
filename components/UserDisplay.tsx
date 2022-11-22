import { NextComponentType } from "next";
import Image from "next/image";
import useAuth from "../hooks/useAuth";
import { Icon } from "@iconify/react";

export const UserDisplay: NextComponentType = () => {
    const { currentUser } = useAuth();

    return (
        <div className="flex flex-row justify-between justify-self-end self-end items-center gap-5">
            <div className="relative w-12 h-12 rounded-full border border-white">
                <Image src={currentUser?.thumbnail} layout="fill" objectFit="cover" className="rounded-full border-2 border-white"/>
            </div>
            <span>{currentUser?.username}</span>
            <button>
                <Icon icon="ci:log-out" className="w-7 h-7" />
            </button>
        </div>
    )
}