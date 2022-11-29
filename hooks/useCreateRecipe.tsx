import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { RecipeMutation } from "../apollo/mutations";
import { RecipeMutationData, RecipeMutationVars } from "../apollo/types";
import { EToasts } from "../enums/toasts";
import { RecipeMutationType } from "../modules/graphql/types/enum";
import { Recipe } from "../modules/graphql/types/interfaces";
import useToast from "./useToast";

const useCreateRecipe = (payload: Partial<Recipe>) => {
  const { showToast } = useToast();
  const [create, { data, loading, error }] = useMutation<
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
        showToast(EToasts.SUCCESS, "Receta creada con éxito");
        setTimeout(() => Router.push(`/recipe/${data.recipe.created}`), 3250);
      }
    })();
  }, [data]);

  return {
    createRecipe: create,
    loading,
    error,
  };
};

export default useCreateRecipe;
