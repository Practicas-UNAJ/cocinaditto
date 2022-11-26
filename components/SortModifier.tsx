import { Icon } from "@iconify/react";
import { forwardRef, useImperativeHandle, useState } from "react";
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
  const toggleList = () => setShowDropdown(!showDropdown)
  const [ selected, setSelected ] = useState<ISort>({
    display: <Icon icon="mdi:cards-heart-outline" className="w-full" />,
    sortBy: RecipeQuerySortBy.LIKES,
    sortOrder: RecipeQuerySortOrder.DESC,
  })

  useImperativeHandle(ref, () => ({
    selected,
  }))
  
  return (
    <div className="relative bg-white w-16">
      <button onClick={toggleList} className="w-full grid justify-center">
        {selected.display}
      </button>
      {showDropdown &&
        <div className="absolute z-20 overflow-auto flex flex-col items-center gap-2 p-2 bg-white w-16">
          <button
            className="w-full"
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
            className="w-full"
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
            className="w-full"
            onClick={() => {
              toggleList()
              setSelected({
                display: <Icon icon="mdi:cards-heart-outline" className="w-full" />,
                sortBy: RecipeQuerySortBy.LIKES,
                sortOrder: selected.sortOrder,
              })
            }}
          >
            <Icon icon="mdi:cards-heart-outline" className="w-full" />
          </button>

          <button
            className="w-full"
            onClick={() => {
              toggleList()
              setSelected({
                display: <Icon icon="material-symbols:calendar-today" className="w-full" />,
                sortBy: RecipeQuerySortBy.CREATED_ON,
                sortOrder: selected.sortOrder,
              })
            }}
          >
            <Icon icon="material-symbols:calendar-today" className="w-full" />
          </button>
        </div>
      }
    </div>
  )
}

export default forwardRef(SortModifier);