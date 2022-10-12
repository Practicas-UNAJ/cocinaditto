import Image, { StaticImageData } from "next/image";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IFlagCheckbuttonData {
    image: StaticImageData
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>
}

export const FlagCheckbutton: FunctionComponent<IFlagCheckbuttonData> = (props) => {
    return (
        <div className={twMerge("cursor-pointer rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-8 h-8 p-1", props.state ? "bg-success-200" : "bg-secondary-500")} onClick={() => props.setState(!props.state)}>
            <Image src={props.image} layout="responsive" objectFit="contain" />
        </div>
    )
}