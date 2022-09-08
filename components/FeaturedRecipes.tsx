import { NextComponentType } from "next"
import { RecipeCard } from "./RecipeCard"

export const FeaturedRecipes: NextComponentType = () => {
    return (
        <div>
            <h2 className="text-center mb-3"><span className="text-xl font-semibold">Recetas Destacadas </span><span className="text-sm">(Última semana)</span></h2>
            <div className="flex flex-row gap-3 justify-center">
                <RecipeCard id={1} image="https://picsum.photos/900?random=1" title="Nombre de Receta" cookingTime="30" portions="5" likes="100" author="FabricioGamer9"/>
                <RecipeCard id={2} image="https://picsum.photos/900?random=2" title="Nombre de Receta" cookingTime="30" portions="5" likes="100" author="FabricioGamer9"/>
                <RecipeCard id={3} image="https://picsum.photos/900?random=3" title="Nombre de Receta" cookingTime="30" portions="5" likes="100" author="FabricioGamer9"/>
            </div>
        </div>
   )
}