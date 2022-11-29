import { Icon } from "@iconify/react";
import { NextComponentType } from "next";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { FlagCheckbutton } from "./Cocinaditto/FlagCheckbutton";
import { CocinadittoInput } from "./Cocinaditto/Input";
import glutenFreeIcon from "../assets/images/gluten-free.png";
import veganIcon from "../assets/images/vegan.png";
import { FilterContext, IFilters } from "../interfaces/context";

export const Filter: NextComponentType = () => {
  const [filters, setFilters] = useContext(FilterContext) as [
    IFilters,
    Dispatch<SetStateAction<IFilters>>
  ];
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleList = () => {
    setShowDropdown(!showDropdown);
  };

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
            "absolute z-20 overflow-auto w-40 flex flex-col items-center gap-2 p-1  pb-8 bg-brown-400 rounded-b-lg shadow-xl",
            showDropdown && "bg-brown-500"
          )}
        >
          <CocinadittoInput
            type="text"
            className="w-full"
            placeholder={filters.title ?? "Titulo"}
            onChange={(ev) =>
              setFilters({ ...filters, title: ev.target.value ?? undefined })
            }
          />
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
              placeholder={`${filters.portions ?? "Porciones"}`}
              className="w-32"
              onChange={(ev) =>
                setFilters({
                  ...filters,
                  portions: parseInt(ev.target.value) ?? undefined,
                })
              }
            />
          </div>
          <div className="flex flex-row items-center gap-1">
            <Icon icon="mdi:user" />
            <CocinadittoInput
              type="text"
              placeholder={filters.author ?? "Autor"}
              className="w-32"
              onChange={(ev) =>
                setFilters({ ...filters, author: ev.target.value ?? undefined })
              }
            />
          </div>
          <div className="flex flex-row gap-5 justify-center">
            <FlagCheckbutton
              image={glutenFreeIcon}
              state={filters.isGlutenFree ?? false}
              setState={() =>
                setFilters({ ...filters, isGlutenFree: !filters.isGlutenFree })
              }
            />
            <FlagCheckbutton
              image={veganIcon}
              state={filters.isVegan ?? false}
              setState={() =>
                setFilters({ ...filters, isVegan: !filters.isVegan })
              }
            />
          </div>
          <button className="text-sm mt-2" onClick={() => setFilters({})}>
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
