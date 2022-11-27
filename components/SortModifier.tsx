import { Icon } from "@iconify/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../apollo/enum";
import { SortContext } from "../pages/recipe/featured";

interface ISortModifier {
  sortBy: RecipeQuerySortBy;
  sortOrder: RecipeQuerySortOrder;
}

type Options = {
  [key in RecipeQuerySortBy as string]: string | ReactNode;
};

const sortByOptions: Options = {
  [RecipeQuerySortBy.CREATED_ON]: (
    <Icon icon="material-symbols:calendar-today" className="w-5 h-5" />
  ),
  [RecipeQuerySortBy.LIKES]: (
    <Icon icon="mdi:cards-heart-outline" className="w-5 h-5" />
  ),
  [RecipeQuerySortBy.PORTIONS]: "1 - 9",
  [RecipeQuerySortBy.TITLE]: "A - Z",
};

const SortModifier = () => {
  const [sortModifier, setSortModifier] = useContext(SortContext) as [
    ISortModifier,
    Dispatch<SetStateAction<ISortModifier>>
  ];
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<ISortModifier>({
    sortBy: RecipeQuerySortBy.LIKES,
    sortOrder: RecipeQuerySortOrder.DESC,
  });

  const toggleList = () => setShowDropdown(!showDropdown);

  const handleSelect = (sortBy: RecipeQuerySortBy) => {
    setSelected({ ...selected, sortBy });

    toggleList();
  };

  const invertOrder = () => {
    if (selected.sortOrder === RecipeQuerySortOrder.DESC)
      return setSelected({ ...selected, sortOrder: RecipeQuerySortOrder.ASC });

    setSelected({ ...selected, sortOrder: RecipeQuerySortOrder.DESC });
  };

  useEffect(() => {
    setSortModifier(selected);
  }, [selected]);

  return (
    <div className="flex flex-row gap-2 font-medium">
      <div
        className={twMerge(
          "relative bg-brown-400 w-16 pt-1 rounded-lg",
          showDropdown && "bg-brown-500 shadow-xl rounded-b-lg"
        )}
      >
        <button onClick={toggleList} className="w-full grid justify-center">
          {sortByOptions[selected.sortBy]}
        </button>
        {showDropdown && (
          <div
            className={twMerge(
              "absolute z-20 overflow-auto flex flex-col items-center gap-1 p-1 bg-brown-400 w-16 rounded-b-lg shadow-xl",
              showDropdown && "bg-brown-500"
            )}
          >
            {Object.keys(sortByOptions).map((key, idx) => {
              return (
                <button
                  onClick={() => handleSelect(key as RecipeQuerySortBy)}
                  key={idx}
                >
                  {sortByOptions[key]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <button className="bg-brown-400 p-1 rounded" onClick={invertOrder}>
        <Icon
          icon="fluent:arrow-sort-down-lines-20-filled"
          className="w-5 h-5"
          style={{
            transform:
              selected.sortOrder === RecipeQuerySortOrder.DESC
                ? "rotateX(180deg)"
                : "",
          }}
        />
      </button>
    </div>
  );
};

export default SortModifier;
