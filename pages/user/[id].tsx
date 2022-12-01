import { ReactElement, useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import { NextPageWithLayout } from "../_app";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";
import { useRouter } from "next/router";
import useProfile from "../../hooks/useProfile";
import useRecipes from "../../hooks/useRecipes";
import { RecipeList } from "../../components/recipes/RecipeList";
import { UserInfo } from "../../components/Cocinaditto/UserInfo";
import SortModifier from "../../components/SortModifier";
import {
  FilterContext,
  IFilters,
  ISortModifier,
  SortContext,
} from "../../interfaces/context";
import { Filter } from "../../components/Filter";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    user,
    loading: profileLoading,
    error: profileError,
  } = useProfile(router.query.id as string);
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
  const [filters, setFilters] = useState<IFilters>({});

  useEffect(() => {
    clear();
  }, [sortModifier, filters]);

  const fetchMoreRecipes = () => {
    fetchMore({
      query: {
        values: {
          author: router.query.id as string,
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

  if (profileLoading) return <LoadingSpinner type={SpinnerType.LARGE} />;
  if (profileError) return <ErrorImage type={ErrorImageType.LARGE} />;

  return user ? (
    <>
      <UserInfo user={user} />
      <p className="text-2xl font-semibold">Recetas</p>
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
