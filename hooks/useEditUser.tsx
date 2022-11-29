import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { EditUserMutation, RecipeMutation } from "../apollo/mutations";
import { EditUserData, EditUserVars } from "../apollo/types";
import { EToasts } from "../enums/toasts";
import useToast from "./useToast";

const useEditUser = ({ payload }: EditUserVars, id: string) => {
  const { showToast } = useToast();
  const [edit, { data, loading, error }] = useMutation<
    EditUserData,
    EditUserVars
  >(EditUserMutation, {
    variables: {
      payload,
    },
  });

  useEffect(() => {
    (async () => {
      if (data?.editUser) {
        showToast(EToasts.SUCCESS, "Perfil actualizado con éxito");
        setTimeout(() => Router.reload(), 3250);
      }
    })();
  }, [data]);

  return {
    editUser: edit,
    loading,
    error,
  };
};

export default useEditUser;
