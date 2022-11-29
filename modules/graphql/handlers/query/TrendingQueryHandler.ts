import { TrendingTime } from "../../types/class";
import ApolloContext from "../../types/context";
import { Pagination } from "../../types/types";

const TrendingQueryHandler = async (
  _parent: any,
  { time, pagination }: { time: TrendingTime; pagination?: Pagination },
  ctx: ApolloContext
) => {
  const trending = await ctx.prisma.like.groupBy({
    by: ["recipeId"],
    where: {
      createdOn: {
        gte: time.dateRange.after,
        lt: time.dateRange.before,
      },
    },
    _count: true,
    orderBy: {
      _count: {
        recipeId: "desc",
      },
    },
    ...(pagination
      ? {
          skip: pagination.offset ?? undefined,
          take: pagination.take ?? undefined,
        }
      : undefined),
  });

  const recipes = trending.map(async (trendingRecipe) => {
    return await ctx.prisma.recipe.findFirst({
      where: {
        id: trendingRecipe.recipeId,
      },
      include: {
        author: true,
      },
    });
  });

  return recipes;
};

export default TrendingQueryHandler;
