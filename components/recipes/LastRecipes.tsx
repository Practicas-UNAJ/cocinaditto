import { NextComponentType } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { HIGHLIGHTED, RecipeCard } from "./RecipeCard";
import { RecipesQuery } from "../../apollo/queries";
import { useQuery } from "@apollo/client";
import { Recipe } from "../../modules/graphql/types/interfaces";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import { RecipesData, RecipesVars } from "../../apollo/types";
import "swiper/css";

export const LastRecipes: NextComponentType = () => {
  const { data, loading, error } = useQuery<RecipesData, RecipesVars>(
    RecipesQuery,
    {
      variables: {
        query: {
          sort: {
            by: RecipeQuerySortBy.CREATED_ON,
            order: RecipeQuerySortOrder.DESC,
          },
        },
      },
    }
  );

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{JSON.stringify(error)}</p>;

  return data ? (
    <div>
      <h2 className="text-xl font-semibold mb-3">Últimas recetas</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        className="max-w-[640px]"
        direction="horizontal"
      >
        {data.recipes.map((recipe: Recipe, key: number) => (
          <SwiperSlide key={key} className="w-fit">
            <RecipeCard {...recipe} highlighted={HIGHLIGHTED.NONE} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <></>
  );
};
