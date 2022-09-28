import Image from "next/image";
import type { StaticImageData } from "next/image";
import { FunctionComponent, useState } from "react";
import { Icon } from "@iconify/react";
import insignia1 from "../../assets/images/insignia1.png";
import insignia2 from "../../assets/images/insignia2.png";
import insignia3 from "../../assets/images/insignia3.png";
import GlutenFree from "../../assets/images/gluten-free.png";
import { Recipe } from "../../modules/graphql/types/interfaces";

export enum HIGHLIGHTED {
  NONE = "NONE",
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

interface RecipeCardData extends Recipe {
  highlighted: HIGHLIGHTED;
}

const highlightedObject = {
  [HIGHLIGHTED.FIRST]: insignia1,
  [HIGHLIGHTED.SECOND]: insignia2,
  [HIGHLIGHTED.THIRD]: insignia3,
};

export const RecipeCard: FunctionComponent<RecipeCardData> = ({
  id,
  highlighted,
  thumbnail,
  title,
  cooking_time,
  isVegan,
  portions,
  glutenFree,
  likes,
  author,
  likedByUser,
}) => {
  const [liked, setLiked] = useState<boolean>(likedByUser);

  return (
    <div
      key={id}
      className="relative bg-gradient-to-br from-card-500 to-card-600 min-w-[9rem] p-2 rounded-xl text-sm shadow-black/25 shadow-md text-card-800"
    >
      <div className="w-5 absolute -translate-x-2/3 -translate-y-2/3">
        {highlighted !== HIGHLIGHTED.NONE && (
          <Image
            src={highlightedObject[highlighted]}
            objectFit="cover"
            layout="responsive"
          />
        )}
      </div>
      <img
        src={thumbnail}
        className="w-full rounded-t-xl object-cover aspect-[4/3]"
      />
      <span className="text-black">{title}</span>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1 items-center">
          <Icon icon="ant-design:clock-circle-filled" />
          <span>{cooking_time}\'</span>
        </div>
        {isVegan && <Icon icon="iconoir:vegan" />}
      </div>
      <div className="flex flex-row justify-between items-center text">
        <div className="flex flex-row gap-1 items-center">
          <Icon icon="fa-solid:pizza-slice" />
          <span>{portions} Porciones</span>
        </div>
        <div className="w-3 h-3">
          {glutenFree && (
            <Image src={GlutenFree} objectFit="cover" layout="responsive" />
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1 items-center">
          <button onClick={() => setLiked(!liked)}>
            {liked ? (
              <Icon icon="icon-park-solid:like" />
            ) : (
              <Icon icon="icon-park-outline:like" />
            )}
          </button>
          <span>{likes}</span>
        </div>
        <span className="text-black">{author.username}</span>
      </div>
    </div>
  );
};
