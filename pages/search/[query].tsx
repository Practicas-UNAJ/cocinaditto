import { useRouter } from "next/router";
import { ReactElement } from "react";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import { MainLayout } from "../../components/layouts/MainLayout";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";
import { RecipeList } from "../../components/recipes/RecipeList";
import useRecipes from "../../hooks/useRecipes";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { fetchMore, hasMore, loading, recipes, error } = useRecipes();

  const fetchMoreRecipes = () => {
    fetchMore({
      query: {
        values: {
          title: router.query.query as string,
        },
        sort: {
          by: RecipeQuerySortBy.CREATED_ON,
          order: RecipeQuerySortOrder.DESC,
        },
      },
    });
  };

  return (
    <>
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
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
