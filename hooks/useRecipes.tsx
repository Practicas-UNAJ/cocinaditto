import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { RecipesQuery } from "../apollo/queries";
import { RecipesData, RecipesVars } from "../apollo/types";
import { Recipe } from "../modules/graphql/types/interfaces";

const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[] | undefined>();

  const [fetch, { data, loading, error }] = useLazyQuery<
    RecipesData,
    RecipesVars
  >(RecipesQuery);

  useEffect(() => {
    if (data?.results) setRecipes(data.results.recipes);
  }, [data]);

  return {
    fetch,
    recipes,
    loading,
    error,
  };
};

export default useRecipes;
