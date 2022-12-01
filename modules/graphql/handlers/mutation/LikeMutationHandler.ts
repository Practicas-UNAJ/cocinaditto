import ApolloContext from "../../types/context";
import { ApolloError } from "apollo-server-micro";

export const LikeMutationHandler = async (
  _parent: any,
  { id }: { id: string },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new ApolloError("Forbidden");

  const liked = await ctx.prisma.like.count({
    where: {
      recipeId: id,
      userId: ctx.user.id,
    },
  });

  const count = await ctx.prisma.like.count({
    where: {
      recipeId: id,
    },
  });

  if (liked) {
    await ctx.prisma.like.delete({
      where: {
        userId_recipeId: {
          recipeId: id,
          userId: ctx.user.id,
        },
      },
    });

    return { state: false, count: count - 1 };
  }

  await ctx.prisma.like.create({
    data: {
      recipeId: id,
      userId: ctx.user.id,
    },
  });

  return { state: true, count: count + 1 };
};
