import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { UserQuery } from "../apollo/queries";
import { UserData, UserVars } from "../apollo/types";
import { IUser } from "../interfaces/user";

const useProfile = (id: string) => {
  const [user, setUser] = useState<IUser | undefined>();

  const { data, loading, error } = useQuery<UserData, UserVars>(UserQuery, {
    variables: {
      id,
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data?.user) setUser(data.user);
  }, [data]);

  return {
    user,
    loading,
    error,
  };
};

export default useProfile;
