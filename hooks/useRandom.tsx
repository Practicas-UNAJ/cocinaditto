import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RandomQuery } from "../apollo/queries";
import { RandomData, RandomVars } from "../apollo/types";

const useRandomRecipe = () => {
  const router = useRouter();
  const [getRandom, { data }] = useLazyQuery<RandomData, RandomVars>(
    RandomQuery,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (data?.recipe) router.push(`/recipe/${data.recipe.id}`);
  }, [data]);

  return {
    getRandom,
  };
};

export default useRandomRecipe;
