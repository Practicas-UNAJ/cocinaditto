import { Prisma, Recipe, SavedRecipe } from "@prisma/client";
import { ApolloError } from "apollo-server-core";
import ApolloContext from "../../types/context";
import { RecipesQueryInput } from "../../types/input";

const RecipesQueryHandler = async (
  _parent: any,
  { query }: RecipesQueryInput,
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new ApolloError("Forbidden");

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
        portions: {
          equals: query.values.portions ?? undefined,
        },
        createdOn: {
          gte: query.values.createdOn?.after ?? undefined,
          lte: query.values.createdOn?.before ?? undefined,
        },
      }
    : undefined;

  const orderBy: Prisma.SavedRecipeOrderByWithRelationInput | undefined =
    query.sort
      ? {
          recipe: {
            [query.sort.by ?? undefined]:
              query.sort.by !== "likes"
                ? query.sort.order
                : {
                    _count: query.sort.order,
                  },
          },
        }
      : undefined;

  const pagination = {
    skip: query.pagination?.offset ?? 0,
    take: query.pagination?.take ?? 10,
  };

  let recipes = await ctx.prisma.savedRecipe.findMany({
    where: {
      userId: ctx.user.id,
      recipe: {
        ...where,
      },
    },
    orderBy,
    include: {
      recipe: {
        include: {
          author: true,
        },
      },
    },
    ...pagination,
  });

  const quantity = await ctx.prisma.savedRecipe.count({
    where: {
      userId: ctx.user.id,
      recipe: {
        ...where,
      },
    },
  });

  const hasMore = Boolean(quantity - (pagination.skip + recipes.length));

  return { hasMore, recipes: recipes.map((savedRecipe) => savedRecipe.recipe) };
};

export default RecipesQueryHandler;
