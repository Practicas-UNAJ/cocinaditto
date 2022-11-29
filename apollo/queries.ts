import { gql } from "@apollo/client";

const RecipeFragment = `
id
author {
  id
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
isOwner
savedByUser
`;

export const UserQuery = gql`
  query User($id: String) {
    user(id: $id) {
      id
      username
      thumbnail
      country
      recipeCount
    }
  }
`;

export const TrendingRecipesQuery = gql`
  query Trending($time: TrendingTime!, $pagination: Pagination!) {
    trending(time: $time, pagination: $pagination) {
      ${RecipeFragment}
    }
  }
`;

export const RecipesQuery = gql`
  query Recipes($query: RecipesQueryInput!) {
    results: recipes(query: $query) {
      hasMore
      recipes {
        ${RecipeFragment}
      }
    }
  }
`;

export const RecipeQuery = gql`
  query Recipe($id: String!) {
    recipe(id: $id) {
      ${RecipeFragment}
    }
  }
`;

export const RandomQuery = gql`
  query Random {
    recipe: random {
      ${RecipeFragment}
    }
  }
`;
