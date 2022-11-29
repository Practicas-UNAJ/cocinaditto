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
import { FilterContext, IFilters, SortContext } from "../../interfaces/context";
import { Filter } from "../../components/Filter";

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
  const [filters, setFilters] = useState<IFilters>({});

  useEffect(() => {
    clear();
  }, [sortModifier, filters]);

  const fetchMoreRecipes = () => {
    fetchMore({
      query: {
        values: {
          title: filters.title ?? undefined,
          portions: filters.portions ?? undefined,
          isVegan: filters.isVegan ?? undefined,
          isGlutenFree: filters.isGlutenFree ?? undefined,
        },
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
        <FilterContext.Provider value={[filters, setFilters]}>
          <div className="flex flex-row justify-between">
            <Filter />
            <SortModifier />
          </div>
          {recipes && (
            <RecipeList
              list={recipes}
              fetchMore={fetchMoreRecipes}
              hasMore={hasMore}
              loading={recipesLoading}
            />
          )}
          {recipesError && <ErrorImage type={ErrorImageType.SMALL} />}
        </FilterContext.Provider>
      </SortContext.Provider>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
