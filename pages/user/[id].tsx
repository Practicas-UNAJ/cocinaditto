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
      <div className="flex flex-row justify-around gap-7">
        <UserImage image={user.thumbnail} />
        <div className="flex flex-col justify-around">
          <span className="font-semibold text-xl">{user.username}</span>
          <div className="flex flex-row items-center gap-3">
            <Icon icon="bxs:user" className="w-7 h-7" />
            <span>200 seguidores</span>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Icon icon="bx:world" className="w-7 h-7" />
            <span>aca va un emoji</span>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Icon icon="bxs:note" className="w-7 h-7" />
            <span>10 recetas</span>
          </div>
        </div>
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
