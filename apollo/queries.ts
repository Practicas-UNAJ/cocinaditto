import { gql } from "@apollo/client";
import { RecipesQueryInput } from "../modules/graphql/types/input";
import { Recipe } from "../modules/graphql/types/interfaces";
import { Pagination, RecipeQueryFields } from "../modules/graphql/types/types";

export enum RecipeQuerySortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export enum RecipeQuerySortBy {
  LIKES = "LIKES",
  PORTIONS = "PORTIONS",
  COUNTRY = "COUNTRY",
  TITLE = "TITLE",
  CREATED_ON = "CREATED_ON",
}

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

export const TrendingRecipesQuery = gql`
  query Trending($time: TrendingTime!, $pagination: Pagination!) {
    trending(time: $time, pagination: $pagination) {
      id
      author {
        username
        createdOn
      }
      title
      thumbnail
      country
      content
      portions
      cooking_time
      isVegan
      glutenFree
      createdOn
      likes
      likedByUser
    }
  }
`;

export const RecipesQuery = gql`
  query Recipes($query: RecipesQueryInput!) {
    recipes(query: $query) {
      id
      author {
        username
        createdOn
      }
      title
      thumbnail
      country
      content
      portions
      cooking_time
      isVegan
      glutenFree
      createdOn
      likes
      likedByUser
    }
  }
`;
