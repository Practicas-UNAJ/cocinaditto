import { NextComponentType } from "next";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { RecipeCard } from "./RecipeCard";

export const LastRecipes: NextComponentType = () => {
    const items = Array(10).fill(0)
    return (
        <div>
            <h2 className="text-center text-xl font-semibold mb-3">Últimas recetas</h2>
            <ScrollMenu wrapperClassName="sm:w-[40rem]" scrollContainerClassName="flex flex-row gap-3 p-4">
                {items.map((_, key) => <RecipeCard id={key} image={`https://picsum.photos/900?random=${key}`} title="Nombre de receta" cookingTime="30" portions="5" likes="100" author="FabricioGamer9" />)}

            </ScrollMenu>
        </div>
    )
}