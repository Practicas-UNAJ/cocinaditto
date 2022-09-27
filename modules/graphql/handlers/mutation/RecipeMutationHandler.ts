import { Recipe } from "@prisma/client";
import { GraphQLError } from "graphql";
import ApolloContext from "../../types/context";
import { RecipeMutationType } from "../../types/enum";
import { MutationHandler, RecipeHandlerResult } from "../../types/handlers";
import CreateRecipe from "./recipe/createHandler";
import DeleteRecipe from "./recipe/deleteHandler";
import EditRecipe from "./recipe/editHandler";

const RecipeMutationHandler = (
  _parent: any,
  { type, payload }: { type: RecipeMutationType; payload: Recipe },
  ctx: ApolloContext
) => {
  if (!ctx.user) throw new GraphQLError("Forbidden");

  const handlers: MutationHandler<
    RecipeMutationType,
    Recipe,
    RecipeHandlerResult
  > = {
    CREATE: CreateRecipe,
    EDIT: EditRecipe,
    DELETE: DeleteRecipe,
  };

  return handlers[type](payload, ctx.prisma, ctx.user);
};

export default RecipeMutationHandler;
