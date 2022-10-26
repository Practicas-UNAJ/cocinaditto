import { Recipe } from "../modules/graphql/types/interfaces";
import { Pagination, RecipeQueryFields } from "../modules/graphql/types/types";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "./enum";

export interface TrendingRecipesData {
  trending: Recipe[];
}

export interface TrendingRecipesVars {
  time: string;
  pagination: Pagination;
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
