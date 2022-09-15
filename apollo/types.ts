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

export interface TrendingRecipesData {
  trending: Recipe[];
}

export interface RecipesData {
  recipes: Recipe[];
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
