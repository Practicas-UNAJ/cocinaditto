import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { RecipeMutation } from "../apollo/mutations";
import { RecipeMutationData, RecipeMutationVars } from "../apollo/types";
import { EToasts } from "../enums/toasts";
import { RecipeMutationType } from "../modules/graphql/types/enum";
import { Recipe } from "../modules/graphql/types/interfaces";
import useToast from "./useToast";

const useEditRecipe = (
  { payload }: Pick<RecipeMutationVars, "payload">,
  id: string
) => {
  const { showToast } = useToast();
  const [edit, { data, loading, error }] = useMutation<
    RecipeMutationData,
    RecipeMutationVars
  >(RecipeMutation, {
    variables: {
      type: RecipeMutationType.EDIT,
      payload: {
        ...payload,
        id,
      },
    },

    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    (async () => {
      if (data) {
        showToast(EToasts.SUCCESS, "Receta editada con éxito");
        setTimeout(() => Router.reload(), 3250);
      }
    })();
  }, [data]);

  return {
    editRecipe: edit,
    loading,
    error,
  };
};

export default useEditRecipe;
