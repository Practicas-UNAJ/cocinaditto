import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../modules/graphql/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Mutation from "../modules/graphql/resolvers/mutation";
import { createContext } from "../modules/graphql/context";

const apollo = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation,
  },
  context: createContext,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        "request.credentials": "include",
      },
    }),
  ],
});

export const startServer = apollo.start();

export default apollo;
