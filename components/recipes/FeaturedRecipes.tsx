import { useQuery } from "@apollo/client";
import { NextComponentType } from "next";
import { TrendingRecipesQuery } from "../../apollo/queries";
import { TrendingRecipesData, TrendingRecipesVars } from "../../apollo/types";
import { Recipe } from "../../modules/graphql/types/interfaces";
import ErrorImage, { ErrorImageType } from "../ErrorImage";
import LoadingSpinner, { SpinnerType } from "../LoadingSpinner";
import NoContentImage, { NoContentImageType } from "../NoContentImage";
import { RecipeCard } from "./RecipeCard";
import { HIGHLIGHTED } from "./RecipeCard";

const numToHighlighted = (n: number) => {
  if (n === 0) return HIGHLIGHTED.FIRST;
  if (n === 1) return HIGHLIGHTED.SECOND;
  if (n === 2) return HIGHLIGHTED.THIRD;
  return HIGHLIGHTED.NONE;
};

export const FeaturedRecipes: NextComponentType = () => {
  const { data, loading, error } = useQuery<
    TrendingRecipesData,
    TrendingRecipesVars
  >(TrendingRecipesQuery, {
    variables: { time: "LAST_WEEK", pagination: { offset: 0, take: 3 } },
  });

  return (
    <div>
      <h2 className="mb-3">
        <span className="text-xl font-semibold">Recetas Destacadas </span>
        <span className="text-sm">(Última semana)</span>
      </h2>
      {error && <ErrorImage type={ErrorImageType.SMALL} />}
      {loading && <LoadingSpinner type={SpinnerType.SMALL} />}
      {data && data.trending.length > 0 ? (
        <div className="flex flex-row gap-3 justify-center">
          {data.trending.map((recipe: Recipe, key: number) => (
            <div className="w-full" key={key}>
              <RecipeCard {...recipe} highlighted={numToHighlighted(key)} />
            </div>
          ))}
        </div>
      ) : (
        <NoContentImage type={NoContentImageType.SMALL} />
      )}
    </div>
  );
};
