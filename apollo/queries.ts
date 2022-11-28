import { gql } from "@apollo/client";

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
      isOwner
    }
  }
`;

export const RecipesQuery = gql`
  query Recipes($query: RecipesQueryInput!) {
    results: recipes(query: $query) {
      hasMore
      recipes {
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
        isOwner
      }
    }
  }
`;

export const RecipeQuery = gql`
  query Recipe($id: String!) {
    recipe(id: $id) {
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
      isOwner
    }
  }
`;

export const RandomQuery = gql`
  query Random {
    recipe: random {
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
      isOwner
    }
  }
`;
