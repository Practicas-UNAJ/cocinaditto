import Head from "next/head";
import { ElementRef, ReactElement, useRef, useState } from "react";
import { FlagCheckbutton } from "../../components/Cocinaditto/FlagCheckbutton";
import { CocinadittoTitle } from "../../components/Cocinaditto/Title";
import { MainLayout } from "../../components/layouts/MainLayout";
import { RecipeImage } from "../../components/recipes/RecipeImage";
import { NextPageWithLayout } from "../_app";
import veganIcon from "../../assets/images/vegan.png";
import glutenFreeIcon from "../../assets/images/gluten-free.png";
import useRecipePage from "../../hooks/useRecipePage";
import { useRouter } from "next/router";
import useLike from "../../hooks/useLike";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";
import RecipeContent from "../../components/RecipeContent";
import { EInfoView } from "../../enums/InfoView";
import ImageInput from "../../components/Cocinaditto/ImageInput";
import { CocinadittoInput } from "../../components/Cocinaditto/Input";
import { Icon } from "@iconify/react";
import RichTextEditor from "../../components/RichTextEditor";

type ImageInputHandle = ElementRef<typeof ImageInput>;

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const imageRef = useRef<ImageInputHandle>(null);
  const { recipe, isLoading } = useRecipePage(router.query.id as string);
  const [ vegan, setVegan ] = useState<boolean>(false)
  const [ glutenFree, setGlutenFree ] = useState<boolean>(false)
  const [ infoState, setInfoState ] = useState<EInfoView>(
    recipe?.isOwner ?
    EInfoView.OWNER :
    EInfoView.USER
  )
  const { icon: likeIcon, likeRecipe } = useLike(
    router.query.id as string,
    recipe?.likedByUser!
  );

  if (isLoading) return <LoadingSpinner type={SpinnerType.LARGE} />;

  return recipe ? (
    <>
      <Head>
        <title>Cocinaditto | {recipe.title}</title>
      </Head>

      {
        infoState === EInfoView.EDIT ?
        <form className="flex flex-col gap-5">
          <ImageInput ref={imageRef} type="RECIPE" />
          <CocinadittoInput
            className="w-full bg-brown-500 placeholder:text-brown-700"
            type="text"
            name="title"
            placeholder="Nombre"
          />
          <div className="flex flex-row gap-5 items-center">
            <div className="w-1/3 flex flex-row gap-3 items-center">
              <Icon className="min-w-max" icon="bxs:time-five" />
              <CocinadittoInput
                className="w-full bg-brown-500 placeholder:text-brown-700"
                type="number"
                placeholder="Tiempo"
                name="cooking_time"
                min={1}
              />
            </div>
            <div className="w-1/3 flex flex-row gap-3 items-center">
              <Icon className="min-w-max" icon="bx:world" />
              <CocinadittoInput
                className="w-full bg-brown-500 placeholder:text-brown-700"
                type="text"
                placeholder="País o región"
                name="country"
              />
            </div>
            <div className="w-1/3 flex flex-row gap-3 items-center">
              <Icon className="min-w-max" icon="fa6-solid:pizza-slice" />
              <CocinadittoInput
                className="w-full bg-brown-500 placeholder:text-brown-700"
                type="number"
                placeholder="Porciones"
                min={1}
                name="portions"
              />
            </div>
          </div>

          <div className="flex flex-row gap-5 justify-center">
            <FlagCheckbutton
              image={glutenFreeIcon}
              state={glutenFree}
              setState={() =>
                setGlutenFree(!glutenFree)
              }
            />
            <FlagCheckbutton
              image={veganIcon}
              state={vegan}
              setState={() => setVegan(!vegan)}
            />
          </div>

          <RichTextEditor
            cb={(content: string) => console.log("a")}
          />

          <button
            onClick={() => setInfoState(EInfoView.OWNER)}
            className="rounded-full bg-secondary-500 text-brown-900 font-semibold w-fit p-3 place-self-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] capitalize">
            guardar
          </button>
        </form>
      :
      <>
        <RecipeImage image={recipe.thumbnail} />
        <CocinadittoTitle text={recipe.title} />

        <span className="text-center font-extralight">Publicado por: {recipe.author.username}</span>

        <div className="flex flex-row gap-5 justify-center">
          {recipe.glutenFree && (
            <FlagCheckbutton image={glutenFreeIcon} state={true} />
          )}
          {recipe.isVegan && <FlagCheckbutton image={veganIcon} state={true} />}
        </div>

        <RecipeContent content={recipe.content} />

        <div className="flex flex-row text-brown-900 justify-center items-center gap-2">
          <button onClick={() => likeRecipe()}>{likeIcon}</button>
          {recipe.likes}
        </div>

        {recipe.isOwner && (
          <div className="flex flex-row gap-3 justify-center">
            <button className="rounded-full font-semibold p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-danger-600 text-white">
              Eliminar
            </button>
            <button
              onClick={() => setInfoState(EInfoView.EDIT)}
              className="rounded-full font-semibold p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-secondary-500 text-brown-900"
            >
              Editar
            </button>
          </div>
        )}
      </>
    }
    </>
  ) : (
    <></>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Page;
