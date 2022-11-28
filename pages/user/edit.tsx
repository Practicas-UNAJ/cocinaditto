import { Icon } from "@iconify/react";
import Head from "next/head";
import { ElementRef, ReactElement, useEffect, useRef, useState } from "react";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import ImageInput from "../../components/Cocinaditto/ImageInput";
import { CocinadittoInput } from "../../components/Cocinaditto/Input";
import { CocinadittoTitle } from "../../components/Cocinaditto/Title";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import { MainLayout } from "../../components/layouts/MainLayout";
import { RecipeList } from "../../components/recipes/RecipeList";
import SortModifier from "../../components/SortModifier";
import useRecipes from "../../hooks/useRecipes";
import { SortContext } from "../recipe/featured";
import { NextPageWithLayout } from "../_app";

type ImageInputHandle = ElementRef<typeof ImageInput>;

interface ISortModifier {
  sortBy: RecipeQuerySortBy;
  sortOrder: RecipeQuerySortOrder;
}

const Page: NextPageWithLayout = () => {
  const imageRef = useRef<ImageInputHandle>(null);
  const {
    recipes,
    fetchMore,
    clear,
    hasMore,
    loading: recipesLoading,
    error: recipesError,
  } = useRecipes();
  const [sortModifier, setSortModifier] = useState<ISortModifier>({
    sortBy: RecipeQuerySortBy.CREATED_ON,
    sortOrder: RecipeQuerySortOrder.DESC,
  });

  useEffect(() => {
    clear();
  }, [sortModifier]);

  const fetchMoreRecipes = () => {
    fetchMore({
      query: {
        sort: {
          by: sortModifier.sortBy as RecipeQuerySortBy,
          order: sortModifier.sortOrder as RecipeQuerySortOrder,
        },
      },
    });
  };

  return (
    <>
      <Head>
        <title>Cocinaditto | Editar perfil</title>
      </Head>
      <CocinadittoTitle text="Editar Perfil" />
      <div className="flex flex-col sm:flex-row justify-around items-center gap-7">
        <ImageInput ref={imageRef} type="USER"/>
        <div className="flex flex-col justify-around items-end gap-6">
          <CocinadittoInput placeholder="Nombre" className="bg-brown-500 placeholder:text-brown-700 w-max"/>
          <div className="flex flex-row items-center gap-1">
            <Icon icon="bx:world" className="w-6 h-6" />
            <CocinadittoInput placeholder="País o región" className="bg-brown-500 placeholder:text-brown-700 w-max"/>
          </div>
          <span className="self-center sm:self-auto">10 Recetas</span>
          <button className="bg-secondary-500 p-2 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] self-center sm:self-auto">
            <Icon icon="material-symbols:save-as-outline-rounded" className="w-6 h-6" />
          </button>
        </div>
      </div>

      <SortContext.Provider value={[sortModifier, setSortModifier]}>
        <SortModifier />
          {recipes && (
            <RecipeList
              list={recipes}
              fetchMore={fetchMoreRecipes}
              hasMore={hasMore}
              loading={recipesLoading}
            />
          )}
          {recipesError && (<><ErrorImage type={ErrorImageType.SMALL} /> {console.log(recipesError)}</>)}
      </SortContext.Provider>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>{page}</MainLayout>
  )
}

export default Page;