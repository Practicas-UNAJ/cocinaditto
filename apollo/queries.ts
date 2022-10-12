import { gql } from "@apollo/client";

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
      }
    }
  }
`;
