import Head from "next/head";
import { ReactElement, useState } from "react";
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

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { recipe, isLoading } = useRecipePage(router.query.id as string);
  const { icon: likeIcon, likeRecipe } = useLike(
    router.query.id as string,
    recipe?.likedByUser!
  );

  return recipe ? (
    <>
      <Head>
        <title>Cocinaditto | {recipe.title}</title>
      </Head>
      <RecipeImage image={recipe.thumbnail} />
      <CocinadittoTitle text={recipe.title} />

      <div className="flex flex-row gap-5 justify-center">
        {recipe.glutenFree && (
          <FlagCheckbutton image={glutenFreeIcon} state={true} />
        )}
        {recipe.isVegan && <FlagCheckbutton image={veganIcon} state={true} />}
      </div>

      <div className="bg-card-500 font-light text-card-900 p-4 rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        {recipe.content}
      </div>

      <div className="flex flex-row text-card-900 justify-center items-center gap-2">
        <button onClick={() => likeRecipe()}>{likeIcon}</button>
        {recipe.likes}
      </div>

      <div className="flex flex-row gap-3 justify-center">
        <button className="rounded-full font-semibold p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-danger-600 text-white">
          Eliminar
        </button>
        <button className="rounded-full font-semibold p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-secondary-500 text-card-900">
          Editar
        </button>
      </div>
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
