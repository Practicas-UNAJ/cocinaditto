import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import { Filter } from "../../components/Filter";
import { MainLayout } from "../../components/layouts/MainLayout";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";
import { RecipeList } from "../../components/recipes/RecipeList";
import SortModifier from "../../components/SortModifier";
import useRecipes from "../../hooks/useRecipes";
import {
  FilterContext,
  IFilters,
  ISortModifier,
  SortContext,
} from "../../interfaces/context";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { fetchMore, hasMore, loading, recipes, error, clear } = useRecipes();
  const [sortModifier, setSortModifier] = useState<ISortModifier>({
    sortBy: RecipeQuerySortBy.LIKES,
    sortOrder: RecipeQuerySortOrder.DESC,
  });
  const [filters, setFilters] = useState<IFilters>({
    title: router.query.query as string,
  });

  useEffect(() => {
    clear();
  }, [sortModifier, filters]);

  const fetchMoreRecipes = () => {
    fetchMore({
      query: {
        values: {
          title: filters.title ?? undefined,
          portions: filters.portions ?? undefined,
          cooking_time: filters.cooking_time ?? undefined,
          isVegan: filters.isVegan ?? undefined,
          isGlutenFree: filters.isGlutenFree ?? undefined,
        },
        sort: {
          by: sortModifier.sortBy,
          order: sortModifier.sortOrder,
        },
      },
    });
  };

  return (
    <>
      <SortContext.Provider value={[sortModifier, setSortModifier]}>
        <FilterContext.Provider value={[filters, setFilters]}>
          <h2 className="text-2xl drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            Resultados para:{" "}
            <span className="text-xl font-bold">{filters.title}</span>
          </h2>
          <div className="flex flex-row justify-between">
            <Filter />
            <SortModifier />
          </div>
          {error && <ErrorImage type={ErrorImageType.SMALL} />}
          {loading && <LoadingSpinner type={SpinnerType.SMALL} />}
          {recipes && (
            <RecipeList
              fetchMore={fetchMoreRecipes}
              hasMore={hasMore}
              list={recipes}
              loading={loading}
            />
          )}
        </FilterContext.Provider>
      </SortContext.Provider>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
