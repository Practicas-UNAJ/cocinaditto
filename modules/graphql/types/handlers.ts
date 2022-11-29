import { PrismaClient, User } from "@prisma/client";
import { RecipeMutationType } from "./enum";
export type MutationHandlerFunc<T, R> = (
  payload: T,
  prisma: PrismaClient,
  user: User
) => R;
export type MutationHandler<T extends RecipeMutationType, T1, R> = Record<
  T,
  MutationHandlerFunc<T1, R>
>;

export type CreateResult = Promise<{ created: string }>;
export type EditResult = Promise<{ edited: boolean }>;
export type DeleteResult = Promise<{ deleted: boolean }>;

export type RecipeHandlerResult = CreateResult | EditResult | DeleteResult;
