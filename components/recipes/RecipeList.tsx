import { FunctionComponent, MutableRefObject, useEffect, useRef } from "react";
import useIsInViewport from "../../hooks/useIsInViewport";
import { Recipe } from "../../modules/graphql/types/interfaces";
import LoadingSpinner, { SpinnerType } from "../LoadingSpinner";
import { RandomRecipe } from "../RandomRecipe";
import { RecipeCard } from "./RecipeCard";

export const RecipeList: FunctionComponent<{
  list: Recipe[];
  fetchMore: (...args: any) => void;
  hasMore: boolean;
  loading: boolean;
}> = ({ list, fetchMore, hasMore, loading }) => {
  const virtualRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { visible } = useIsInViewport(virtualRef);

  useEffect(() => {
    if (hasMore && visible) fetchMore();
  }, [visible]);

  return (
    <>
      {list.length < 6 && loading && (
        <LoadingSpinner type={SpinnerType.SMALL} />
      )}
      <div className="grid grid-cols-3 gap-3">
        {list.slice(0, 6).map((recipe: Recipe, key: number) => (
          <RecipeCard {...recipe} key={key} />
        ))}
      </div>
      <RandomRecipe />
      <div className="grid grid-cols-3 gap-3">
        {list.slice(6, list.length).map((recipe: Recipe, key: number) => (
          <RecipeCard {...recipe} key={key} />
        ))}
      </div>
      <div className="w-full h-[0px] bg-red-500" ref={virtualRef}></div>

      {list.length > 6 && loading && (
        <LoadingSpinner type={SpinnerType.SMALL} />
      )}
    </>
  );
};
