import RandomHandler from "../handlers/query/RandomQueryHandler";
import RecipeQueryHandler from "../handlers/query/RecipeQueryHandler";
import RecipesQueryHandler from "../handlers/query/RecipesQueryHandler";
import TrendingQueryHandler from "../handlers/query/TrendingQueryHandler";
import UserQueryHandler from "../handlers/query/UserQueryHandler";

const Query = {
  recipes: RecipesQueryHandler,
  recipe: RecipeQueryHandler,
  trending: TrendingQueryHandler,
  random: RandomHandler,
  user: UserQueryHandler,
};

export default Query;
