import { Prisma, Recipe } from "@prisma/client";
import ApolloContext from "../../types/context";

const UserQueryHandler = async (
  _parent: any,
  _: unknown,
  ctx: ApolloContext
) => {
  return ctx.user;
};

export default UserQueryHandler;
