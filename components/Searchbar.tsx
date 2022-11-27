import { NextComponentType } from "next";
import { Icon } from "@iconify/react";
import { useState } from "react";
import router from "next/router";

export const Searchbar: NextComponentType = () => {
  const [ query, setQuery ] = useState<string>("")
  const inputHandler = (ev: any) => setQuery(ev.target.value)
  const submitHandler = (ev: any) => {
    if (ev.keyCode === 13) {
      setQuery("");
      router.push(`/search/${encodeURIComponent(query)}`);
    }
  };
  return (
    <div className="flex flex-row self-center gradient w-full sm:w-80 px-3 mt-10 rounded-md items-center gap-3 shadow-black/25 shadow-md text-brown-900">
      <Icon icon="akar-icons:search" className="w-4 h-4" />
      <input
        type="text"
        onChange={inputHandler}
        onKeyDown={submitHandler}
        placeholder="Buscar..."
        className=" bg-transparent w-full h-8 md:h-6 placeholder:text-inherit placeholder:text-sm focus:outline-none"
      />
    </div>
  );
};