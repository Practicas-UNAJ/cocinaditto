import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { RecipeMutation } from "../apollo/mutations";
import { RecipeMutationData, RecipeMutationVars } from "../apollo/types";
import { RecipeMutationType } from "../modules/graphql/types/enum";
import { Recipe } from "../modules/graphql/types/interfaces";

const useCreateRecipe = (payload: Partial<Recipe>) => {
  const [create, { data, error }] = useMutation<
    RecipeMutationData,
    RecipeMutationVars
  >(RecipeMutation, {
    variables: {
      type: RecipeMutationType.CREATE,
      payload,
    },
  });

  useEffect(() => {
    (async () => {
      if (data) {
        Router.push(`/recipe/${data.recipe.created}`);
      }
    })();
  }, [data]);

  return {
    createRecipe: create,
    error,
  };
};

export default useCreateRecipe;
