import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import { RegisterMutation } from "../apollo/mutations";
import { RegisterData, RegisterVars } from "../apollo/types";
import useAuth from "./useAuth";

const useRegister = () => {
  const { signUp } = useAuth();
  const [register, { data, error }] = useMutation<RegisterData, RegisterVars>(
    RegisterMutation
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
