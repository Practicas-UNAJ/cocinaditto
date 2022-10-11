import { PrismaClient, Recipe, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { editRecipe } from "../../../../joi/schemas/recipe";
import { EditResult, MutationHandlerFunc } from "../../../types/handlers";

const EditRecipe: MutationHandlerFunc<Recipe, EditResult> = async (
  payload: Omit<Recipe, "userId">,
  prisma: PrismaClient,
  user: User
) => {
  try {
    await editRecipe.validateAsync(payload, {
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

    const edited = await prisma.recipe.update({
      where: {
        id: payload.id,
      },
      data: {
        ...payload,
      },
    });

    return { edited: Boolean(edited) };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(error));
  }
};

export default EditRecipe;
