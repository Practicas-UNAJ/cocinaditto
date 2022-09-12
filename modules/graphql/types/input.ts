import { Pagination, RecipeQueryFields, RecipeSorting } from "./types";

export interface RegisterMutationInput {
  credentials: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
}

export interface LoginMutationInput {
  credentials: {
    email: string;
    password: string;
  };
}

export interface RecipesQueryInput {
  query: {
    values: RecipeQueryFields;
    sort: RecipeSorting;
    pagination: Pagination;
  };
}
