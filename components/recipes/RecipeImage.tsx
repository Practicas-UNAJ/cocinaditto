import { FunctionComponent } from "react"

interface IRecipeImageData {
    image: string
}

export const RecipeImage: FunctionComponent<IRecipeImageData> = ({image}) => {
    return (
        <img src={image} className="w-full aspect-[5/2] object-cover rounded-md border-[1px] border-card-900" />
    )
}