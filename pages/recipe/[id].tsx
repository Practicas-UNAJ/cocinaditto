import Head from "next/head";
import { ReactElement, useState } from "react";
import { FlagCheckbutton } from "../../components/Cocinaditto/FlagCheckbutton";
import { CocinadittoTitle } from "../../components/Cocinaditto/Title";
import { MainLayout } from "../../components/layouts/MainLayout";
import { RecipeImage } from "../../components/recipes/RecipeImage";
import { NextPageWithLayout } from "../_app";
import veganIcon from "../../assets/images/vegan.png"
import glutenFreeIcon from "../../assets/images/gluten-free.png"
import { Icon } from "@iconify/react";

const Page: NextPageWithLayout = () => {
    const [isLiked, setIsLiked] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>chocotorta</title>
            </Head>
            <RecipeImage image="https://picsum.photos/1000"/>
            <CocinadittoTitle text="Titulo de la receta" />

            <div className="flex flex-row gap-5 justify-center">
                <FlagCheckbutton image={glutenFreeIcon} state={true} setState={() => console.log("a")}/>
                <FlagCheckbutton image={veganIcon} state={true} setState={() => console.log("a")}/>
            </div>

            <div className="bg-card-500 font-light text-card-900 p-4 rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat quidem illo minus nemo et quia, iste iusto nihil error fuga sunt odit sequi est laborum assumenda corporis veritatis suscipit? Non.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat quam expedita hic porro ipsam officia unde in, est doloribus nisi, aliquid dignissimos veritatis, laborum voluptates eius. Architecto consequuntur quos necessitatibus!
            </div>

            <div className="flex flex-row text-card-900 justify-center items-center gap-2">
                <button onClick={() => setIsLiked(!isLiked)}>
                    {isLiked ? (
                    <Icon icon="icon-park-solid:like" />
                    ) : (
                    <Icon icon="icon-park-outline:like" />
                    )}
                </button>
                23 likes
            </div>

            <div className="flex flex-row gap-3 justify-center">
                <button className="rounded-full font-semibold p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-danger-600 text-white">Eliminar</button>
                <button className="rounded-full font-semibold p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-secondary-500 text-card-900">Editar</button>
            </div>
        </>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <MainLayout>
                {page}
            </MainLayout>
        </>
    )
}
  
export default Page;