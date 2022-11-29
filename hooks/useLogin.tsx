import { ApolloError, useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { LoginMutation } from "../apollo/mutations";
import { LoginData, LoginVars } from "../apollo/types";
import { EToasts } from "../enums/toasts";
import useAuth from "./useAuth";
import useToast from "./useToast";

const useLogin = (onError?: (error: ApolloError) => any) => {
  const { showToast } = useToast();
  const { signIn } = useAuth();
  const [login, { data, error }] = useMutation<LoginData, LoginVars>(
    LoginMutation,
    {
      onError,
    }
  );

  useEffect(() => {
    (async () => {
      if (data) {
        await signIn(data.login);
        showToast(EToasts.SUCCESS, "Inicio de sesion exitoso");
        setTimeout(() => Router.reload(), 3250);
      }
    })();
  }, [data]);

  return {
    login,
    error,
  };
};

export default useLogin;
