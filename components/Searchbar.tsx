import { NextComponentType } from "next";
import { Icon } from "@iconify/react";

export const Searchbar: NextComponentType = () => {
  return (
    <div className="flex flex-row self-center gradient w-full sm:w-80 px-3 mt-10 rounded-md items-center gap-3 shadow-black/25 shadow-md text-brown-700">
      <Icon icon="akar-icons:search" className="w-4 h-4" />
      <input
        type="text"
        placeholder="Buscar..."
        className=" bg-transparent w-full h-8 md:h-6 placeholder:text-inherit placeholder:text-sm "
      />
    </div>
  );
};
