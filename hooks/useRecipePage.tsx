import { useQuery } from "@apollo/client";
import { RecipeQuery } from "../apollo/queries";
import { RecipeData, RecipeVars } from "../apollo/types";

const useRecipePage = (id: string) => {
  const { data, loading } = useQuery<RecipeData, RecipeVars>(RecipeQuery, {
    variables: {
      id,
    },
    fetchPolicy: "no-cache",
  });

  return {
    recipe: data?.recipe,
    isLoading: loading,
  };
};

export default useRecipePage;
