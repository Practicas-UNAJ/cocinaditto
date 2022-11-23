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
import { getApps, initializeApp } from "firebase/app";
import { UserQuery } from "../apollo/queries";

if (!getApps().length)
  initializeApp({
    apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`,
    projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_APP_ID}`,
  });

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
      query: UserQuery,
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
