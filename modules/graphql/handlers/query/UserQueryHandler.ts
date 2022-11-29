import { Prisma, Recipe } from "@prisma/client";
import ApolloContext from "../../types/context";

const UserQueryHandler = async (
  _parent: any,
  { id }: { id: string },
  ctx: ApolloContext
) => {
  if (id) {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  return ctx.user;
};

export default UserQueryHandler;
