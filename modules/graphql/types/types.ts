import { RecipeSortBy, SortDirections } from "./enum";

export type RecipeSorting = {
  by: RecipeSortBy;
  order: SortDirections;
};

export type Pagination = {
  offset: number;
  take: number;
};

export type RecipeQueryFields = {
  title?: string;
  country?: string;
  portions?: number;
  isGlutenFree?: boolean;
  isVegan?: boolean;
  author?: string;
  createdOn?: DateRange;
};

export type DateRange = {
  before: Date;
  after: Date;
};
