import Image from "next/image";
import { FunctionComponent } from "react";
import { Icon } from "@iconify/react";
import insignia1 from "../../assets/images/insignia1.png";
import insignia2 from "../../assets/images/insignia2.png";
import insignia3 from "../../assets/images/insignia3.png";
import GlutenFree from "../../assets/images/gluten-free.png";
import { Recipe } from "../../modules/graphql/types/interfaces";
import Link from "next/link";
import useSaveRecipe from "../../hooks/useSaveRecipe";
import useAuth from "../../hooks/useAuth";
import useModal from "../../hooks/useModal";
import { EModals } from "../../enums/modals";

export enum HIGHLIGHTED {
  NONE = "NONE",
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

interface RecipeCardData extends Recipe {
  highlighted?: HIGHLIGHTED;
}

const highlightedObject = {
  [HIGHLIGHTED.FIRST]: insignia1,
  [HIGHLIGHTED.SECOND]: insignia2,
  [HIGHLIGHTED.THIRD]: insignia3,
};

export const RecipeCard: FunctionComponent<RecipeCardData> = ({
  id,
  highlighted = HIGHLIGHTED.NONE,
  thumbnail,
  title,
  cooking_time,
  isVegan,
  portions,
  glutenFree,
  likes,
  author,
  likedByUser,
  savedByUser,
}) => {
  const { icon, save } = useSaveRecipe(id, savedByUser);
  const { currentUser } = useAuth();
  const { setModal } = useModal();

  return (
    <Link href={`/recipe/${id}`}>
      <div
        key={id}
        className="relative gradient w-full max-w-[228px] p-2 rounded-xl text-sm shadow-black/25 shadow-md "
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
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={thumbnail}
            className="rounded-t-xl object-cover"
            layout="fill"
            objectFit="cover"
          />
          <button
            onClick={(ev) => {
              if (currentUser) {
                ev.stopPropagation();
                save();
              } else setModal(ev, EModals.LOGIN);
            }}
            className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
          >
            {icon}
          </button>
        </div>
        <div className="text-ellipsis whitespace-nowrap inline-block max-w-full overflow-hidden">
          {title}
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-1 items-center">
            <Icon icon="ant-design:clock-circle-filled" />
            <span>{cooking_time}&apos;</span>
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
            {likedByUser ? (
              <Icon icon="icon-park-solid:like" />
            ) : (
              <Icon icon="icon-park-outline:like" />
            )}
            <span>{likes}</span>
          </div>
          <span>{author.username}</span>
        </div>
      </div>
    </Link>
  );
};
