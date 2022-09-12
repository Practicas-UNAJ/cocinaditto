import { TrendingTime } from "../types/class";
import { RecipeSortBy, SortDirections } from "../types/enum";

const Enum = {
  SortDirections: {
    ASC: SortDirections.ASC,
    DESC: SortDirections.DESC,
  },
  RecipeSortBy: {
    LIKES: RecipeSortBy.LIKES,
    PORTIONS: RecipeSortBy.PORTIONS,
    COUNTRY: RecipeSortBy.COUNTRY,
    TITLE: RecipeSortBy.TITLE,
    CREATED_ON: RecipeSortBy.CREATED_ON,
  },
  TrendingTime: {
    YESTERDAY: TrendingTime.YESTERDAY,
    LAST_WEEK: TrendingTime.LAST_WEEK,
    LAST_MONTH: TrendingTime.LAST_MONTH,
    LAST_YEAR: TrendingTime.LAST_YEAR,
  },
};

export default Enum;
