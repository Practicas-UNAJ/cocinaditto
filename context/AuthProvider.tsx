import { useApolloClient } from "@apollo/client";
import {
  getAuth,
  signInWithCustomToken,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IAuthContext } from "../interfaces/context";
import Router from "next/router";
import { gql } from "apollo-server-core";
import { IUser } from "../interfaces/user";

const auth = getAuth();
export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider = ({ children }: PropsWithChildren<any>) => {
  const client = useApolloClient();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = (token: string) => {
    return signInWithCustomToken(auth, token);
  };

  const signOut = (): any => {
    firebaseSignOut(auth);
    Router.reload();
  };

  const signUp = (token: string) => {
    return signInWithCustomToken(auth, token);
  };

  const fetch = async () => {
    const { data } = await client.query({
      query: gql`
        query User {
          user {
            id
            username
            thumbnail
          }
        }
      `,
    });

    if (data) setCurrentUser(data.user);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      await fetch();
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signIn,
    signOut,
    signUp,
    fetch,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
