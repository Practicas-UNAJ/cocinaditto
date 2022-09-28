import { NextComponentType } from "next";
import { RecipeImage } from "../recipes/RecipeImage";

export const ImageInput: NextComponentType = () => {
    return (
        <div className="relative group">
            <RecipeImage image="https://picsum.photos/1000"/>
            <div className="absolute top-0 left-0 grid items-center justify-center w-full h-full">
                <input type="file" className="absolute w-full h-full opacity-0" />
                <span className="text-card-700 font-semibold">Publica una imagen de tu receta</span>
            </div>
        </div>
    )
}