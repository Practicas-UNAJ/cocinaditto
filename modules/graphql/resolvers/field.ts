import { Recipe } from "@prisma/client";
import ApolloContext from "../types/context";

const Field = {
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
  },
};

export default Field;
