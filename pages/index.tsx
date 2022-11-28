import { ReactElement } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";
import { Searchbar } from "../components/Searchbar";
import { FeaturedRecipes } from "../components/recipes/FeaturedRecipes";
import { RandomRecipe } from "../components/RandomRecipe";
import { LastRecipes } from "../components/recipes/LastRecipes";
import { NewRecipe } from "../components/NewRecipe";
import ExhibitDisclaimer from "../components/ExhibitDisclaimer";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Cocinaditto | Inicio</title>
      </Head>
      <Searchbar />
      <FeaturedRecipes />
      <RandomRecipe />
      <LastRecipes />
      <NewRecipe />
      <ExhibitDisclaimer />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
