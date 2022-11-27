import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { RecipesQuery } from "../apollo/queries";
import { RecipesData, RecipesVars } from "../apollo/types";
import { Recipe } from "../modules/graphql/types/interfaces";

const useRecipes = (limit?: number) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [fetch, { data, loading, error }] = useLazyQuery<
    RecipesData,
    RecipesVars
  >(RecipesQuery);
  const [hasMore, setHasMore] = useState(true);

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
  };
};

export default useRecipes;
