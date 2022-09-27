import { PrismaClient, Recipe, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CreateResult, MutationHandlerFunc } from "../../../types/handlers";

const CreateRecipe: MutationHandlerFunc<Recipe, CreateResult> = async (
  payload: Omit<Recipe, "id">,
  prisma: PrismaClient,
  user: User
) => {
  try {
    const recipe = await prisma.recipe.create({
      data: {
        ...payload,
        userId: user.id,
      },
    });

    return { created: recipe.id };
  } catch (error) {
    console.log(error);
    throw new GraphQLError(JSON.stringify(error));
  }
};

export default CreateRecipe;
