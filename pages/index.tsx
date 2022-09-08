import { ReactElement } from "react";
import { MainLayout } from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";
import { Searchbar } from "../components/Searchbar";
import { FeaturedRecipes } from "../components/FeaturedRecipes";
import { RandomRecipe } from "../components/RandomRecipe";
import { LastRecipes } from "../components/LastRecipes";
import { NewRecipe } from "../components/NewRecipe";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Searchbar/>
      <FeaturedRecipes/>
      <RandomRecipe/>
      <LastRecipes/>
      <NewRecipe/>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default Page;
