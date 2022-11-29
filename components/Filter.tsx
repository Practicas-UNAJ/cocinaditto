import { Icon } from "@iconify/react";
import { NextComponentType } from "next";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FlagCheckbutton } from "./Cocinaditto/FlagCheckbutton";
import { CocinadittoInput } from "./Cocinaditto/Input";
import glutenFreeIcon from "../assets/images/gluten-free.png"
import veganIcon from "../assets/images/vegan.png"

export const Filter: NextComponentType = () => {
  const [ showDropdown, setShowDropdown ] = useState<boolean>(false)
  const [ vegan, setVegan ] = useState<boolean>(false)
  const [ glutenFree, setGlutenFree ] = useState<boolean>(false)
  const toggleList = () => setShowDropdown(!showDropdown)
  return (
    <div
      className={twMerge(
        "relative bg-brown-400 w-40 pt-1",
        showDropdown ? "bg-brown-500 shadow-xl rounded-t-lg" : "rounded-lg"
      )}
    >
      <button onClick={toggleList} className="w-full grid justify-center">
        Filtros
      </button>
      {showDropdown && (
        <div
          className={twMerge(
            "absolute z-20 overflow-auto w-40 flex flex-col items-center gap-2 p-1 bg-brown-400 rounded-b-lg shadow-xl",
            showDropdown && "bg-brown-500"
          )}
        >
          <div className="flex flex-row items-center gap-1">
            <Icon icon="bxs:time-five" />
            <CocinadittoInput
              type="number"
              placeholder="Tiempo"
              className="w-32"
            />
          </div>
          <div className="flex flex-row items-center gap-1">
            <Icon icon="fa6-solid:pizza-slice" />
            <CocinadittoInput
              type="number"
              placeholder="Porciones"
              className="w-32"
            />
          </div>
          <div className="flex flex-row items-center gap-1">
            <Icon icon="mdi:user" />
            <CocinadittoInput
              type="text"
              placeholder="Autor"
              className="w-32"
            />
          </div>
          <div className="flex flex-row gap-5 justify-center">
          <FlagCheckbutton
            image={glutenFreeIcon}
            state={glutenFree}
            setState={() => setGlutenFree(!glutenFree)}
          />
          <FlagCheckbutton
            image={veganIcon}
            state={vegan}
            setState={() => setVegan(!vegan)}
          />
        </div>
          <button
            onClick={toggleList}
            className="py-1 px-3 bg-secondary-500 rounded-full"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  )
}