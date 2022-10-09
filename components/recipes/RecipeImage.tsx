import Image from "next/image"
import { FunctionComponent } from "react"

interface IRecipeImageData {
    image: string 
}

export const RecipeImage: FunctionComponent<IRecipeImageData> = ({image}) => {
    return (
        <img src={image} className="object-cover aspect-[5/2] rounded-md border-[1px] border-card-900"/>
    )
}