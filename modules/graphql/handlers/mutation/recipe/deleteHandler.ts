import { PrismaClient, Recipe, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { deleteRecipe } from "../../../../joi/schemas/recipe";
import { DeleteResult, MutationHandlerFunc } from "../../../types/handlers";

const DeleteRecipe: MutationHandlerFunc<Recipe, DeleteResult> = async (
  payload: Pick<Recipe, "id">,
  prisma: PrismaClient,
  user: User
) => {
  try {
    await deleteRecipe.validateAsync(payload, {
      abortEarly: false,
    });

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        author: true,
      },
    });

    if (!recipe) throw new GraphQLError("Not Found");
    if (user.id !== recipe.author.id) throw new GraphQLError("Forbidden");

    const deleted = await prisma.recipe.delete({
      where: {
        id: payload.id,
      },
    });

    return { deleted: Boolean(deleted) };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(error));
  }
};

export default DeleteRecipe;
