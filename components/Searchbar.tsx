import { NextComponentType } from "next"
import { Icon } from '@iconify/react';

export const Searchbar: NextComponentType = () => {
    return (
        <div className="flex flex-row bg-card-500 w-full sm:w-80 px-3 mt-10 rounded-md items-center gap-3 shadow-black/25 shadow-md">
            <Icon icon="akar-icons:search" className="w-4 h-4" />
            <input type="text" placeholder="Buscar..." className=" bg-transparent w-full h-8 md:h-6 placeholder:text-sm placeholder:text-black/50"/>
        </div>
    )
}