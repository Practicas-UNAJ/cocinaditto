import { ReactElement } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import { UserImage } from "../../components/UserImage";
import useAuth from "../../hooks/useAuth";
import { NextPageWithLayout } from "../_app"
import { Icon } from "@iconify/react";
import { RecipeList } from "../../components/recipes/RecipeList";
import { useQuery } from "@apollo/client";
import { RecipesData, RecipesVars } from "../../apollo/types";
import { RecipesQuery } from "../../apollo/queries";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import ErrorImage, { ErrorImageType } from "../../components/ErrorImage";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";

const Page: NextPageWithLayout = () => {
    const { currentUser } = useAuth();
    const {data, loading, error } = useQuery<
      RecipesData,
      RecipesVars
    >(RecipesQuery, {
      variables: {query: {
        values: {
          author: currentUser?.username,
        },
        sort: {
          by: RecipeQuerySortBy.CREATED_ON,
          order: RecipeQuerySortOrder.DESC,
        }
      }}
    });


    return (
      <>
        <div className="flex flex-row justify-around gap-7">
          <UserImage image={currentUser?.thumbnail} />
          <div className="flex flex-col justify-around">
            <span className="font-semibold text-xl">{currentUser?.username}</span>
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
        {error && <ErrorImage type={ErrorImageType.SMALL}/>}
        {loading && <LoadingSpinner type={SpinnerType.SMALL}/>}
        {data && <RecipeList list={data.results.recipes}/>}
      </>

    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
      <>
        <MainLayout>{page}</MainLayout>
      </>
    );
  };
  
  export default Page;