import { Recipe, User } from "@prisma/client";
import ApolloContext from "../types/context";

const Field = {
  User: {
    recipeCount: async (
      _parent: User,
      _: any,
      ctx: ApolloContext
    ): Promise<number> => {
      return await ctx.prisma.recipe.count({
        where: {
          userId: _parent.id,
        },
      });
    },
  },
  Recipe: {
    likes: async (
      _parent: Recipe,
      _: any,
      ctx: ApolloContext
    ): Promise<number> => {
      return await ctx.prisma.like.count({
        where: {
          recipeId: _parent.id,
        },
      });
    },
    likedByUser: async (
      _parent: Recipe,
      _: any,
      ctx: ApolloContext
    ): Promise<Boolean> => {
      if (!ctx.user) return false;

      const like = await ctx.prisma.like.findFirst({
        where: {
          recipeId: _parent.id,
          userId: ctx.user.id,
        },
      });

      return Boolean(like);
    },
    isOwner: async (
      _parent: Recipe,
      _: any,
      ctx: ApolloContext
    ): Promise<Boolean> => {
      if (!ctx.user) return false;
      return _parent.userId === ctx.user.id;
    },
  },
};

export default Field;
