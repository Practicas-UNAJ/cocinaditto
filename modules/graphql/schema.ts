import { gql } from "apollo-server-core";

const schema = gql`
  scalar DateTime

  union RecipeMutationResult = CreateResult | EditResult | DeleteResult

  type Query {
    user: User
    recipes(query: RecipesQueryInput!): RecipesQueryResult
    recipe(id: String!): Recipe
    trending(time: TrendingTime!, pagination: Pagination): [Recipe]
    random: Recipe
  }

  type Mutation {
    register(credentials: RegisterMutationInput!): String
    login(credentials: LoginMutationInput!): String
    recipe(
      type: RecipeMutationType!
      payload: RecipeMutationInput!
    ): RecipeMutationResult
    like(id: String!): Boolean
  }

  type User {
    id: String
    username: String
    thumbnail: String
    createdOn: DateTime
  }

  type Recipe {
    id: ID
    author: User
    title: String
    thumbnail: String
    country: String
    content: String
    portions: Int
    cooking_time: Int
    isVegan: Boolean
    glutenFree: Boolean
    createdOn: DateTime
    likes: Int
    likedByUser: Boolean
  }

  type RecipesQueryResult {
    hasMore: Boolean
    recipes: [Recipe]
  }

  input RegisterMutationInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginMutationInput {
    email: String!
    password: String!
  }

  input DateRange {
    before: DateTime
    after: DateTime
  }

  input RecipeQueryFields {
    title: String
    country: String
    portions: Int
    isGlutenFree: Boolean
    isVegan: Boolean
    author: String
    createdOn: DateRange
  }

  input RecipeSorting {
    by: RecipeSortBy
    order: SortDirections
  }

  input Pagination {
    offset: Int = 0
    take: Int = 5
  }

  input RecipesQueryInput {
    values: RecipeQueryFields
    sort: RecipeSorting
    pagination: Pagination
  }

  input RecipeMutationInput {
    id: ID
    title: String
    thumbnail: String
    country: String
    content: String
    portions: Int
    cooking_time: Int
    isVegan: Boolean
    glutenFree: Boolean
  }

  type CreateResult {
    created: String
  }

  type EditResult {
    edited: Boolean
  }

  type DeleteResult {
    deleted: Boolean
  }

  enum RecipeMutationType {
    CREATE
    EDIT
    DELETE
  }

  enum SortDirections {
    ASC
    DESC
  }

  enum RecipeSortBy {
    LIKES
    PORTIONS
    COUNTRY
    TITLE
    CREATED_ON
  }

  enum TrendingTime {
    YESTERDAY
    LAST_WEEK
    LAST_MONTH
    LAST_YEAR
  }
`;

export default schema;
