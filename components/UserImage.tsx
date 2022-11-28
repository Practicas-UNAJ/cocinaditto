import { Icon } from "@iconify/react";
import Image from "next/image";
import { FunctionComponent } from "react";
import placeholder from "../assets/images/recipe-placeholder.png";

interface IUserImageData {
  image?: string
}

export const UserImage: FunctionComponent<IUserImageData> = ({image}) => {
  return (
    <div className="relative left-1/2 -translate-x-1/2 aspect-square max-w-xs rounded-md border border-brown-900 overflow-hidden">
      <Image
        src={image ? image : placeholder.src}
        layout="fill"
        objectFit="cover"
      />
      {
        !image &&
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row w-max gap-3 text-brown-700">
          <Icon icon="grommet-icons:upload" className="w-7 h-7"/>
          <span>editar foto de perfil</span>
        </div>
      }
    </div>
  )
}