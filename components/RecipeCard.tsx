import Image from "next/image"
import { FunctionComponent, useState } from "react"
import placeholder from "../assets/images/insignia.png"
import { Icon } from "@iconify/react"
import GlutenFree from "../assets/images/gluten-free.png"

enum HIGHLIGHTED {
    NONE = "NONE",
    FIRST = "FIRST",
    SECOND = "SECOND",
    THIRD = "THIRD"
}

interface RecipCardData {
    id: number
    highlighted?: HIGHLIGHTED
    image: string
    title: string
    cookingTime: string
    portions: string
    likes: string
    author: string
}

export const RecipeCard: FunctionComponent<RecipCardData> = ({
    id,
    highlighted,
    image,
    title,
    cookingTime,
    portions,
    likes,
    author
}) => {

    const [liked, setLiked] = useState<boolean>(false);

    return (
        <div key={id} className="bg-gradient-to-br from-card-500 to-card-600 w-40 sm:w-52 p-2 rounded-xl text-sm shadow-black/25 shadow-md text-card-800">
            <div className="w-5 absolute -translate-x-2/3 -translate-y-2/3">
                <Image src={placeholder} objectFit="cover" layout="responsive"/> 
            </div>
            <img src={image} className="w-full rounded-t-xl object-cover aspect-[4/3]"/>
            <span className="text-black">{title}</span>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1 items-center">
                    <Icon icon="ant-design:clock-circle-filled"/>
                    <span>{cookingTime}'</span>
                </div>
                <Icon icon="iconoir:vegan"/>
            </div>
            <div className="flex flex-row justify-between items-center text">
                <div className="flex flex-row gap-1 items-center">
                    <Icon icon="fa-solid:pizza-slice"/>
                    <span>{portions} Porciones</span>
                </div>
                <div className="w-3 h-3">
                    <Image src={GlutenFree} objectFit="cover" layout="responsive" />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1 items-center">
                    <button onClick={() => setLiked(!liked)}>
                        {liked
                            ? <Icon icon="icon-park-solid:like" />
                            : <Icon icon="icon-park-outline:like" />
                        }
                    </button>
                    <span>{likes}</span>
                </div>
                <span className="text-black">{author}</span>
            </div>
        </div>
    )
}