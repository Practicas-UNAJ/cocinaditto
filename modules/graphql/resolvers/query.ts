import RecipesQueryHandler from "../handlers/query/RecipesQueryHandler";
import TrendingQueryHandler from "../handlers/query/TrendingQueryHandler";

const Query = {
  recipes: RecipesQueryHandler,
  trending: TrendingQueryHandler,
};

export default Query;
