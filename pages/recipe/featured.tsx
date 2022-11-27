import Head from "next/head";
import { ElementRef, ReactElement, useRef } from "react";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import { CocinadittoTitle } from "../../components/Cocinaditto/Title";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import { MainLayout } from "../../components/layouts/MainLayout";
import { RecipeList } from "../../components/recipes/RecipeList";
import { NextPageWithLayout } from "../_app";
import SortModifier from "../../components/SortModifier";
import useRecipes from "../../hooks/useRecipes";

type SortHandle = ElementRef<typeof SortModifier>;

const Page: NextPageWithLayout = () => {
  const selectRef = useRef<SortHandle>(null);
  const {
    recipes,
    fetchMore,
    hasMore,
    loading: recipesLoading,
    error: recipesError,
  } = useRecipes();

  const fetchMoreRecipes = () => {
    fetchMore({
      query: {
        sort: {
          by: selectRef.current?.selected?.sortBy as RecipeQuerySortBy,
          order: selectRef.current?.selected?.sortOrder as RecipeQuerySortOrder,
        },
      },
    });
  };

  return (
    <>
      <Head>
        <title>Cocinaditto | Recetas destacadas</title>
      </Head>
      <CocinadittoTitle text="Recetas destacadas" />
      <SortModifier ref={selectRef} />
      {recipes && (
        <RecipeList
          list={recipes}
          fetchMore={fetchMoreRecipes}
          hasMore={hasMore}
          loading={recipesLoading}
        />
      )}
      {recipesError && <ErrorImage type={ErrorImageType.SMALL} />}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
