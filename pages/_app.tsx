import "../styles/globals.css";
import "../styles/richtexteditor.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import app from "../libs/firebaseApp";
import { setContext } from "@apollo/client/link/context";
import ModalProvider from "../context/ModalProvider";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const getIdToken = async () => await app.auth.currentUser?.getIdToken();

const authLink = setContext(async (_, { headers }) => {
  const token = await getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Bypass-Tunnel-Reminder": true,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
    </Head>
    <ApolloProvider client={client}>
      <ModalProvider>
      {getLayout(
        <Component {...pageProps} />
        )}
      </ModalProvider>
    </ApolloProvider>
    </>
  );
}
