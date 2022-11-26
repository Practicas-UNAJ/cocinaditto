import { useQuery } from "@apollo/client";
import Head from "next/head";
import { ElementRef, ReactElement, useRef } from "react";
import { RecipeQuerySortOrder } from "../../apollo/enum";
import { RecipesQuery } from "../../apollo/queries";
import { RecipesData, RecipesVars } from "../../apollo/types";
import { CocinadittoTitle } from "../../components/Cocinaditto/Title";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import { MainLayout } from "../../components/layouts/MainLayout";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";
import { RecipeList } from "../../components/recipes/RecipeList";
import { NextPageWithLayout } from "../_app";
import SortModifier from "../../components/SortModifier";

type SortHandle = ElementRef<typeof SortModifier>;

const Page: NextPageWithLayout = () => {
  const selectRef = useRef<SortHandle>()
  const { data, loading, error } = useQuery<
    RecipesData,
    RecipesVars
  >(RecipesQuery, {
    variables: {
      query: {
        sort: {
          by: selectRef.current?.selected?.sortBy,
          order: RecipeQuerySortOrder.DESC,
        }
      }
    }
  });
  
  return (
    <>
      <Head>
        <title>Cocinaditto | Recetas destacadas</title>
      </Head>
      <CocinadittoTitle text="Recetas destacadas" />
      <SortModifier ref={selectRef} />
      {error && <ErrorImage type={ErrorImageType.SMALL}/> }
      {loading && <LoadingSpinner type={SpinnerType.SMALL} /> }
      <RecipeList list={data?.results.recipes} />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
