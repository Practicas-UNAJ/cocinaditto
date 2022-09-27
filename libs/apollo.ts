import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../modules/graphql/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Mutation from "../modules/graphql/resolvers/mutation";
import { createContext } from "../modules/graphql/context";
import Query from "../modules/graphql/resolvers/query";
import Field from "../modules/graphql/resolvers/field";
import Enum from "../modules/graphql/resolvers/enum";
import { DateTimeResolver } from "graphql-scalars";
import Union from "../modules/graphql/resolvers/union";

const apollo = new ApolloServer({
  typeDefs,
  resolvers: {
    DateTime: DateTimeResolver,
    ...Enum,
    ...Field,
    ...Union,
    Query,
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
