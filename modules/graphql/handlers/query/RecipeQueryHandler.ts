import { Prisma, Recipe } from "@prisma/client";
import ApolloContext from "../../types/context";
import { RecipesQueryInput } from "../../types/input";

const RecipeQueryHandler = async (
  _parent: any,
  { id }: { id: string },
  ctx: ApolloContext
) => {
  const recipe = await ctx.prisma.recipe.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  return recipe;
};

export default RecipeQueryHandler;
