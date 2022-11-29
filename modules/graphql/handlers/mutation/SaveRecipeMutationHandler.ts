import { ApolloError } from "apollo-server-micro";
import ApolloContext from "../../types/context";

export const SaveMutationHandler = async (
  _parent: any,
  { id }: { id: string },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new ApolloError("Forbidden");

  const alreadySaved = await ctx.prisma.savedRecipe.findUnique({
    where: {
      userId_recipeId: {
        recipeId: id,
        userId: ctx.user.id,
      },
    },
  });

  if (alreadySaved) {
    await ctx.prisma.savedRecipe.delete({
      where: {
        userId_recipeId: {
          recipeId: id,
          userId: ctx.user.id,
        },
      },
    });

    return false;
  }

  await ctx.prisma.savedRecipe.create({
    data: {
      recipeId: id,
      userId: ctx.user.id,
    },
  });

  return true;
};
