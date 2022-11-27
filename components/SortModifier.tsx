import { Icon } from "@iconify/react";
import { forwardRef, useImperativeHandle, useState } from "react";
import { twMerge } from "tailwind-merge";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../apollo/enum";

interface ISort {
  display: any
  sortBy: RecipeQuerySortBy
  sortOrder: RecipeQuerySortOrder
}

type SortHandle = {
  selected: ISort | null,
}

const SortModifier: React.ForwardRefRenderFunction<SortHandle> = (_, ref) => {
  const [ showDropdown, setShowDropdown] = useState<boolean>(false)
  const [ clicked, setClicked ] = useState<boolean>(false)
  const toggleList = () => setShowDropdown(!showDropdown)
  const [ selected, setSelected ] = useState<ISort>({
    display: <Icon icon="mdi:cards-heart-outline" className="w-5 h-5" />,
    sortBy: RecipeQuerySortBy.LIKES,
    sortOrder: RecipeQuerySortOrder.DESC,
  })

  const oppositeOrder = () => {
    if (selected.sortOrder === RecipeQuerySortOrder.DESC) return RecipeQuerySortOrder.ASC
    if (selected.sortOrder === RecipeQuerySortOrder.ASC) return RecipeQuerySortOrder.DESC
  }

  useImperativeHandle(ref, () => ({
    selected,
  }))
  
  return (
    <div className="flex flex-row gap-2 font-medium">
      <div className={twMerge("relative bg-brown-400 w-16 pt-1 rounded-lg", showDropdown && "bg-brown-500 shadow-xl rounded-b-lg")}>
        <button onClick={toggleList} className="w-full grid justify-center">
          {selected.display}
        </button>
        {showDropdown &&
          <div className={twMerge("absolute z-20 overflow-auto flex flex-col items-center gap-1 p-1 bg-brown-400 w-16 rounded-b-lg shadow-xl", showDropdown && "bg-brown-500")}>
            <button
              onClick={() => {
                toggleList()
                setSelected({
                  display: "A - Z",
                  sortBy: RecipeQuerySortBy.TITLE,
                  sortOrder: selected.sortOrder,
                })
              }}
            >
              A - Z
            </button>

            <button
              onClick={() => {
                toggleList()
                setSelected({
                  display: "1- 9",
                  sortBy: RecipeQuerySortBy.PORTIONS,
                  sortOrder: selected.sortOrder,
                })
              }}
            >
              1 - 9
            </button>

            <button
              onClick={() => {
                toggleList()
                setSelected({
                  display: <Icon icon="mdi:cards-heart-outline" className="w-5 h-5" />,
                  sortBy: RecipeQuerySortBy.LIKES,
                  sortOrder: selected.sortOrder,
                })
              }}
            >
              <Icon icon="mdi:cards-heart-outline" className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                toggleList()
                setSelected({
                  display: <Icon icon="material-symbols:calendar-today" className="w-5 h-5" />,
                  sortBy: RecipeQuerySortBy.CREATED_ON,
                  sortOrder: selected.sortOrder,
                })
              }}
            >
              <Icon icon="material-symbols:calendar-today" className="w-5 h-5" />
            </button>
          </div>
        }
      </div>
      
      <button
        className={twMerge("bg-brown-400 p-1 rounded", clicked && "bg-brown-500")}
        onClick={() => {
          setSelected({
            display: selected.display,
            sortBy: selected.sortBy,
            sortOrder: oppositeOrder() as RecipeQuerySortOrder,
          })
          setClicked(true)
          setTimeout(() => setClicked(false), 100)
        }}
      >
        <Icon icon="fluent:arrow-sort-24-filled" className="w-5 h-5" />
      </button>
    </div>
  )
}

export default forwardRef(SortModifier);