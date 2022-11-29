import { PrismaClient, User } from "@prisma/client";

type ApolloContext = {
  prisma: PrismaClient;
  user: User | null;
};

export default ApolloContext;
