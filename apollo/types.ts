import { RecipeMutationType } from "../modules/graphql/types/enum";
import { Recipe, User } from "../modules/graphql/types/interfaces";
import { Pagination, RecipeQueryFields } from "../modules/graphql/types/types";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "./enum";

export interface TrendingRecipesData {
  trending: Recipe[];
}

export interface TrendingRecipesVars {
  time: string;
  pagination: Pagination;
}

export interface UserData {
  user: User;
}

export interface UserVars {
  id?: string;
}

export interface RecipeData {
  recipe: Recipe;
}

export interface RecipeVars {
  id: string;
}

export interface RandomData {
  recipe: Recipe;
}

export interface RandomVars {}

export interface LoginData {
  login: string;
}
export interface LoginVars {
  credentials: {
    email: string;
    password: string;
  };
}
export interface RegisterData {
  register: string;
}
export interface RegisterVars {
  credentials: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
}

export interface LikeData {
  like: boolean;
}

export interface LikeVars {
  id: string;
}

export interface RecipesData {
  results: {
    hasMore: boolean;
    recipes: Recipe[];
  };
}

export interface SavedRecipesVars {
  query: {
    values?: RecipeQueryFields;
    sort?: {
      by: RecipeQuerySortBy;
      order: RecipeQuerySortOrder;
    };
    pagination?: Pagination;
  };
}
export interface SavedRecipesData {
  results: {
    hasMore: boolean;
    recipes: Recipe[];
  };
}

export interface RecipesVars {
  query: {
    values?: RecipeQueryFields;
    sort?: {
      by: RecipeQuerySortBy;
      order: RecipeQuerySortOrder;
    };
    pagination?: Pagination;
  };
}

export interface RecipeMutationData {
  recipe: {
    deleted?: boolean;
    created?: string;
    edited?: boolean;
  };
}

export interface RecipeMutationVars {
  type: RecipeMutationType;
  payload: Partial<
    Omit<Recipe, "author" | "createdOn" | "likes" | "likedByUser">
  >;
}

export interface EditUserVars {
  payload: {
    username?: string;
    country?: string;
    thumbnail?: string;
  };
}
export interface EditUserData {
  editUser: boolean;
}

export interface SaveData {
  save: boolean;
}

export interface SaveVars {
  id: string;
}
