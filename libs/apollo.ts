import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../modules/graphql/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const apollo = new ApolloServer({
  typeDefs,
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
