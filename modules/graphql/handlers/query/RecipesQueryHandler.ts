import { Prisma, Recipe } from "@prisma/client";
import ApolloContext from "../../types/context";
import { RecipesQueryInput } from "../../types/input";

const RecipesQueryHandler = async (
  _parent: any,
  { query }: RecipesQueryInput,
  ctx: ApolloContext
) => {
  const where: Prisma.RecipeWhereInput | undefined = query.values
    ? {
        author: {
          id: query.values.author ?? undefined,
        },
        title: {
          startsWith: query.values.title ?? undefined,
        },
        glutenFree: {
          equals: query.values.isGlutenFree ?? undefined,
        },
        isVegan: {
          equals: query.values.isVegan ?? undefined,
        },
        cooking_time: {
          gte: query.values.cooking_time
            ? query.values.cooking_time - 15
            : undefined,
          lte: query.values.cooking_time
            ? query.values.cooking_time + 15
            : undefined,
        },
        portions: {
          gte: query.values.portions ? query.values.portions - 2 : undefined,
          lte: query.values.portions ? query.values.portions + 2 : undefined,
        },
        createdOn: {
          gte: query.values.createdOn?.after ?? undefined,
          lte: query.values.createdOn?.before ?? undefined,
        },
      }
    : undefined;

  const orderBy: Prisma.RecipeOrderByWithRelationInput | undefined = query.sort
    ? {
        [query.sort.by ?? undefined]:
          query.sort.by !== "likes"
            ? query.sort.order
            : {
                _count: query.sort.order,
              },
      }
    : undefined;

  ctx.prisma.like.groupBy({
    by: ["recipeId"],
    _count: {
      recipeId: true,
    },
    orderBy: {
      _count: {
        recipeId: "desc",
      },
    },
  });

  const pagination = {
    skip: query.pagination?.offset ?? 0,
    take: query.pagination?.take ?? 10,
  };

  const recipes: Recipe[] = await ctx.prisma.recipe.findMany({
    where,
    orderBy,
    include: {
      author: true,
    },
    ...pagination,
  });

  const quantity = await ctx.prisma.recipe.count({
    where,
  });

  const hasMore = Boolean(quantity - (pagination.skip + recipes.length));

  return { hasMore, recipes };
};

export default RecipesQueryHandler;
