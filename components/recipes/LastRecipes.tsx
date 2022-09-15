import { NextComponentType } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { HIGHLIGHTED, RecipeCard } from "./RecipeCard";
import 'swiper/css'

export const LastRecipes: NextComponentType = () => {
  const items = Array(10).fill(0);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">
        Últimas recetas
      </h2>

      <Swiper slidesPerView={3} spaceBetween={30} className="max-w-[640px]" direction="horizontal">
        {items.map((_, key) => 
          <SwiperSlide key={key} className="w-fit">
              <RecipeCard image={`https://picsum.photos/900?random=${key}`} highlighted={HIGHLIGHTED.NONE} title="Nombre de receta" cookingTime="30" vegan={true} portions="5" glutenFree={false} likes="100" author="nombre autor" />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
