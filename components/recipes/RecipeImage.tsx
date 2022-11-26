import Image from "next/image";
import { FunctionComponent } from "react";
import placeholder from "../../assets/images/recipe-placeholder.png";
interface IRecipeImageData {
  image?: string;
}

export const RecipeImage: FunctionComponent<IRecipeImageData> = ({ image }) => {
  return (
    <div className="relative aspect-video rounded-md border border-brown-900 overflow-hidden">
      <Image
        src={image ? image : placeholder.src}
        layout="fill"
        objectFit="cover"
      />
      {
        !image &&
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brown-700">Publicar una imagen de tu receta</span>
      }
    </div>
  );
};
