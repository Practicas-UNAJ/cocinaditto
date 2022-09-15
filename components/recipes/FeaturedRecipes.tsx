import { NextComponentType } from "next"
import { RecipeCard } from "./RecipeCard"
import { HIGHLIGHTED } from "./RecipeCard"

export const FeaturedRecipes: NextComponentType = () => {
    return (
        <div>
            <h2 className="mb-3"><span className="text-xl font-semibold">Recetas Destacadas </span><span className="text-sm">(Última semana)</span></h2>
            <div className="flex flex-row gap-3 justify-center">
                <RecipeCard id={1}  highlighted={HIGHLIGHTED.FIRST} image="https://picsum.photos/900?random=1" title="Nombre de Receta" cookingTime="30" vegan={true} portions="5" glutenFree={false} likes="100" author="nombre autor"/>
                <RecipeCard id={1}  highlighted={HIGHLIGHTED.SECOND} image="https://picsum.photos/900?random=2" title="Nombre de Receta" cookingTime="30" vegan={false} portions="5" glutenFree={true} likes="100" author="nombre autor"/>
                <RecipeCard id={1}  highlighted={HIGHLIGHTED.THIRD} image="https://picsum.photos/900?random=3" title="Nombre de Receta" cookingTime="30" vegan={true} portions="5" glutenFree={false} likes="100" author="nombre autor"/>
            </div>
        </div>
   )
}