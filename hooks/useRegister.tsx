import { ApolloError, useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { RegisterMutation } from "../apollo/mutations";
import { RegisterData, RegisterVars } from "../apollo/types";
import useAuth from "./useAuth";

const useRegister = (onError?: (error: ApolloError) => any) => {
  const { signUp } = useAuth();
  const [register, { data, error }] = useMutation<RegisterData, RegisterVars>(
    RegisterMutation,
    {
      onError,
    }
  );

  useEffect(() => {
    (async () => {
      if (data) {
        await signUp(data.register);
        Router.reload();
      }
    })();
  }, [data]);

  return {
    register,
    error,
  };
};

export default useRegister;
