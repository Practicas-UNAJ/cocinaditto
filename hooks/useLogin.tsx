import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { LoginMutation } from "../apollo/mutations";
import { LoginData, LoginVars } from "../apollo/types";
import useAuth from "./useAuth";

const useLogin = () => {
  const { signIn } = useAuth();
  const [login, { data, error }] = useMutation<LoginData, LoginVars>(
    LoginMutation
  );

  useEffect(() => {
    (async () => {
      if (data) {
        await signIn(data.login);
        Router.reload();
      }
    })();
  }, [data]);

  return {
    login,
    error,
  };
};

export default useLogin;
