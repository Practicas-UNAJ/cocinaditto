import { NextComponentType } from "next";
import { useState } from "react";
import { RecipeImage } from "../recipes/RecipeImage";
import placeholder from "../../assets/images/recipe-placeholder.png";

export const ImageInput: NextComponentType = () => {
    const [imageData, setImageData] = useState<string>("");

    return (
        <div className="relative group">
            {
                imageData !== "" ?
                <RecipeImage image="https://picsum.photos/1000"/>
                : <RecipeImage image={placeholder.src} />
            }
            <div className="absolute top-0 left-0 grid items-center justify-center w-full h-full">
                <input type="file" className="absolute w-full h-full opacity-0" />
                <span className="text-card-700 font-semibold">{imageData !== "" ? "" : "Publica una imagen de tu receta"}</span>
            </div>
        </div>
    )
}