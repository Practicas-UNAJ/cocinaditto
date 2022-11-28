import { ReactElement, useEffect } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import { UserImage } from "../../components/UserImage";
import { NextPageWithLayout } from "../_app";
import { Icon } from "@iconify/react";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";
import { useRouter } from "next/router";
import useProfile from "../../hooks/useProfile";
import useRecipes from "../../hooks/useRecipes";
import { RecipeCard } from "../../components/recipes/RecipeCard";
import { RecipeList } from "../../components/recipes/RecipeList";
import { UserInfo } from "../../components/Cocinaditto/UserInfo";
import { EInfoView } from "../../enums/InfoView";

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
    hasMore,
    loading: recipesLoading,
    error: recipesError,
  } = useRecipes();

  const fetchMoreRecipes = () => {
    fetchMore({
      query: {
        values: {
          author: router.query.id as string,
        },
        sort: {
          by: RecipeQuerySortBy.CREATED_ON,
          order: RecipeQuerySortOrder.DESC,
        },
      },
    });
  };

  if (profileLoading) return <LoadingSpinner type={SpinnerType.LARGE} />;
  if (profileError) return <ErrorImage type={ErrorImageType.LARGE} />;

  return user ? (
    <>
      <UserInfo view={EInfoView.USER} username={user.username} thumbnail={user.thumbnail} recipes={recipes.length} />
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
