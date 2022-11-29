import { PrismaClient, Recipe, User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CreateResult, MutationHandlerFunc } from "../../../types/handlers";
import { v4 } from "uuid";
import uploadImage from "../../../../firebase/uploadImage";

const CreateRecipe: MutationHandlerFunc<Recipe, CreateResult> = async (
  payload: Omit<Recipe, "id">,
  prisma: PrismaClient,
  user: User
) => {
  const recipe = await prisma.recipe.create({
    data: {
      ...payload,
      userId: user.id,
    },
  });

  const uuid = v4();
  const result = await uploadImage(
    payload.thumbnail,
    `recipes/${recipe.id}/${uuid}.png`
  );

  await prisma.recipe.update({
    where: {
      id: recipe.id,
    },
    data: {
      thumbnail: result.downloadUrl ?? undefined,
    },
  });

  return { created: recipe.id };
};

export default CreateRecipe;
