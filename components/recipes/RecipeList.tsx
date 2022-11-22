import { FunctionComponent } from "react";
import { RecipesData } from "../../apollo/types";
import { Recipe } from "../../modules/graphql/types/interfaces";
import { RandomRecipe } from "../RandomRecipe";
import { HIGHLIGHTED, RecipeCard } from "./RecipeCard";

interface IRecipeList {
  list?: Recipe[]
}

export const RecipeList: FunctionComponent<IRecipeList> = (props) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {props.list?.slice(0, 6).map((recipe: Recipe, key: number) => (
          <RecipeCard {...recipe} highlighted={HIGHLIGHTED.NONE} />
          ))}
      </div>
      <RandomRecipe/>
      <div className="grid grid-cols-3 gap-3">  
        {props.list?.slice(6).map((recipe: Recipe, key: number) => (
          <RecipeCard {...recipe} highlighted={HIGHLIGHTED.NONE} />
          ))}
      </div>
    </>
  )
}