import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { RecipeMutation } from "../apollo/mutations";
import { RecipeMutationData, RecipeMutationVars } from "../apollo/types";
import { EToasts } from "../enums/toasts";
import { RecipeMutationType } from "../modules/graphql/types/enum";
import { Recipe } from "../modules/graphql/types/interfaces";
import useToast from "./useToast";

const useDeleteRecipe = (id: string) => {
  const { showToast } = useToast();
  const [deleteRecipe, { data, loading, error }] = useMutation<
    RecipeMutationData,
    RecipeMutationVars
  >(RecipeMutation, {
    variables: {
      type: RecipeMutationType.DELETE,
      payload: { id },
    },
  });

  useEffect(() => {
    (async () => {
      if (data?.recipe.deleted) {
        showToast(EToasts.SUCCESS, "Receta eliminada con éxito");
        setTimeout(() => Router.push(`/`), 3250);
      }
    })();
  }, [data]);

  return {
    deleteRecipe,
    loading,
    error,
  };
};

export default useDeleteRecipe;
