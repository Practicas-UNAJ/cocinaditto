import { PrismaClient, Recipe, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import formatError from "../../../../../utils/formatError";
import { createRecipe } from "../../../../joi/schemas/recipe";
import { CreateResult, MutationHandlerFunc } from "../../../types/handlers";

const CreateRecipe: MutationHandlerFunc<Recipe, CreateResult> = async (
  payload: Omit<Recipe, "id">,
  prisma: PrismaClient,
  user: User
) => {
  try {
    await createRecipe.validateAsync(payload, {
      abortEarly: false,
    });

    const recipe = await prisma.recipe.create({
      data: {
        ...payload,
        userId: user.id,
      },
    });

    return { created: recipe.id };
  } catch (error: any) {
    throw new GraphQLError(JSON.stringify(formatError(error)));
  }
};

export default CreateRecipe;
