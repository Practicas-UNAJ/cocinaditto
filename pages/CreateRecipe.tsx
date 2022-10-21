import { ReactElement, useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import { CocinadittoTitle } from "../components/Cocinaditto/Title";
import { ImageInput } from "../components/Cocinaditto/ImageInput";
import { Icon } from "@iconify/react";
import { CocinadittoInput } from "../components/Cocinaditto/Input";
import Head from "next/head";
import { FlagCheckbutton } from "../components/Cocinaditto/FlagCheckbutton";
import veganIcon from "../assets/images/vegan.png"
import glutenFreeIcon from "../assets/images/gluten-free.png"
import RichTextEditor from "../components/RichTextEditor";

const Page: NextPageWithLayout = () => {
    const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false)
    const [isVegan, setIsVegan] = useState<boolean>(false)
    return (
        <>
            <Head>
                <title>New recipe</title>
            </Head>
            <CocinadittoTitle text="Publicar receta" />
            <ImageInput/>
            <CocinadittoInput className="w-full bg-card-500 placeholder:text-card-700" type="text" placeholder="Nombre"/>
            <div className="flex flex-row gap-5 items-center text-card-900">
                <div className="w-1/3 flex flex-row gap-3 items-center">
                    <Icon className="min-w-max" icon="bxs:time-five" />
                    <CocinadittoInput className="w-full bg-card-500 placeholder:text-card-700" type="number" placeholder="Tiempo" min={1}/>
                </div>
                <div className="w-1/3 flex flex-row gap-3 items-center">
                    <Icon className="min-w-max" icon="bx:world" />
                    <CocinadittoInput className="w-full bg-card-500 placeholder:text-card-700" type="text" placeholder="País o región"/>
                </div>
                <div className="w-1/3 flex flex-row gap-3 items-center">
                    <Icon className="min-w-max" icon="fa6-solid:pizza-slice" />
                    <CocinadittoInput className="w-full bg-card-500 placeholder:text-card-700" type="number" placeholder="Porciones" min={1}/>
                </div>
            </div>

            <div className="flex flex-row gap-5 justify-center">
                <FlagCheckbutton image={glutenFreeIcon} state={isGlutenFree} setState={setIsGlutenFree}/>
                <FlagCheckbutton image={veganIcon} state={isVegan} setState={setIsVegan}/>
            </div>

            <RichTextEditor cb={(content: string) => console.log(content)}/>

            <button className="rounded-full bg-secondary-500 text-card-900 font-semibold w-fit p-3 place-self-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">Publicar</button>
        </>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default Page;