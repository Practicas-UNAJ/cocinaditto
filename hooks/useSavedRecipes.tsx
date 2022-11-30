import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { RecipesQuery, SavedRecipesQuery } from "../apollo/queries";
import {
  RecipesData,
  RecipesVars,
  SavedRecipesData,
  SavedRecipesVars,
} from "../apollo/types";
import { Recipe } from "../modules/graphql/types/interfaces";

const useSavedRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [fetch, { data, loading, error }] = useLazyQuery<
    SavedRecipesData,
    SavedRecipesVars
  >(SavedRecipesQuery, {
    fetchPolicy: "no-cache",
  });
  const [hasMore, setHasMore] = useState(true);

  const clear = () => {
    setRecipes([]);
    setHasMore(true);
  };

  useEffect(() => {
    if (data?.results) {
      setRecipes((state) => [...state, ...data.results.recipes]);
      setHasMore(data.results.hasMore);
    }
  }, [data]);

  const fetchMore = ({ query }: RecipesVars) => {
    fetch({
      variables: {
        query: {
          ...query,
          pagination: {
            offset: recipes.length,
            take: 6,
          },
        },
      },
    });
  };

  return {
    fetch,
    fetchMore,
    hasMore,
    recipes,
    loading,
    error,
    clear,
  };
};

export default useSavedRecipes;
