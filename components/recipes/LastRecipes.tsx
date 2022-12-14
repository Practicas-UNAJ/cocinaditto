import { NextComponentType } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { HIGHLIGHTED, RecipeCard } from "./RecipeCard";
import { RecipesQuery } from "../../apollo/queries";
import { useQuery } from "@apollo/client";
import { Recipe } from "../../modules/graphql/types/interfaces";
import { RecipeQuerySortBy, RecipeQuerySortOrder } from "../../apollo/enum";
import { RecipesData, RecipesVars } from "../../apollo/types";
import "swiper/css";
import { Icon } from "@iconify/react";
import LoadingSpinner, { SpinnerType } from "../LoadingSpinner";
import ErrorImage, { ErrorImageType } from "../ErrorImage";
import NoContentImage, { NoContentImageType } from "../NoContentImage";

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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Últimas recetas</h2>
      <div className="flex flex-row mb-4 gap-4">
        <Icon icon="akar-icons:info-fill" className="w-4 h-4" />
        <p className="font-bold text-xs">
          Puedes deslizar hacia la derecha para ver mas recetas
        </p>
      </div>
      {error && <ErrorImage type={ErrorImageType.SMALL} />}
      {loading && <LoadingSpinner type={SpinnerType.SMALL} />}
      {data ? (
        data.results.recipes.length > 0 || data.results.hasMore ? (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            className="max-w-[640px] h-[228px]"
            direction="horizontal"
          >
            {data.results.recipes.map((recipe: Recipe, key: number) => (
              <SwiperSlide key={key} className="w-fit">
                <RecipeCard {...recipe} highlighted={HIGHLIGHTED.NONE} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <NoContentImage type={NoContentImageType.SMALL} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};
