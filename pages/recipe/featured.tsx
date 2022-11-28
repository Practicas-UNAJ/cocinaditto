import Head from "next/head";
import {
  createContext,
  Dispatch,
  ElementRef,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import { CocinadittoTitle } from "../../components/Cocinaditto/Title";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import { MainLayout } from "../../components/layouts/MainLayout";
import { RecipeList } from "../../components/recipes/RecipeList";
import { NextPageWithLayout } from "../_app";
import SortModifier from "../../components/SortModifier";
import useRecipes from "../../hooks/useRecipes";
import { SortContext } from "../../interfaces/context";

interface ISortModifier {
  sortBy: RecipeQuerySortBy;
  sortOrder: RecipeQuerySortOrder;
}

const Page: NextPageWithLayout = () => {
  const {
    recipes,
    fetchMore,
    clear,
    hasMore,
    loading: recipesLoading,
    error: recipesError,
  } = useRecipes();
  const [sortModifier, setSortModifier] = useState<ISortModifier>({
    sortBy: RecipeQuerySortBy.LIKES,
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
        <title>Cocinaditto | Recetas destacadas</title>
      </Head>
      <CocinadittoTitle text="Recetas destacadas" />
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
        {recipesError && <ErrorImage type={ErrorImageType.SMALL} />}
      </SortContext.Provider>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
