import { Prisma, Recipe } from "@prisma/client";
import ApolloContext from "../../types/context";
import { RecipesQueryInput } from "../../types/input";

const RandomHandler = async (
  _parent: any,
  { id }: { id: string },
  ctx: ApolloContext
) => {
  const count = await ctx.prisma.recipe.count();
  const randomSkip = Math.floor(Math.random() * count);
  const recipe: Recipe = (
    await ctx.prisma.recipe.findMany({
      take: 1,
      skip: randomSkip,
      include: {
        author: true,
      },
    })
  )[0];

  return recipe;
};

export default RandomHandler;
