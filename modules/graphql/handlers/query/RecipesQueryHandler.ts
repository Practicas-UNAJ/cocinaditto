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
          username: query.values.author ?? undefined,
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
        portions: {
          equals: query.values.portions ?? undefined,
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

  const pagination = query.pagination
    ? {
        skip: query.pagination.offset ?? undefined,
        take: query.pagination.take ?? undefined,
      }
    : undefined;

  const recipes: Recipe[] = await ctx.prisma.recipe.findMany({
    where,
    orderBy,
    include: {
      author: true,
    },
    ...pagination,
  });

  return recipes;
};

export default RecipesQueryHandler;
