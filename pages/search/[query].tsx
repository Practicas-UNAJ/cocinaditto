import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import { RecipesQuery } from "../../apollo/queries";
import { RecipesData, RecipesVars } from "../../apollo/types";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import { MainLayout } from "../../components/layouts/MainLayout";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";
import { RecipeList } from "../../components/recipes/RecipeList";
import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<
    RecipesData,
    RecipesVars
  >(
    RecipesQuery,
    {
      variables: {
        query: {
          values: {
            title: router.query.query,
          },
          sort: {
            by: RecipeQuerySortBy.CREATED_ON,
            order: RecipeQuerySortOrder.DESC,
          }
        }
      }
    }
  )
  return (
    <>
      { error && (
        <>
          <ErrorImage type={ErrorImageType.SMALL} />
          {console.log(error)}
        </>
      )}
      { loading && <LoadingSpinner type={SpinnerType.SMALL} /> }
      {data && <RecipeList list={data.results.recipes}/>}
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
  
export default Page;