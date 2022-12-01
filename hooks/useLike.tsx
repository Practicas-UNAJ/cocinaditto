import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { LikeMutation } from "../apollo/mutations";
import { LikeData, LikeVars } from "../apollo/types";
import { Recipe } from "../modules/graphql/types/interfaces";

const useLike = (recipe: Recipe) => {
  const [liked, setLiked] = useState(recipe?.likedByUser);
  const [count, setCount] = useState(recipe?.likes);
  const [likeRecipe, { data, error }] = useMutation<LikeData, LikeVars>(
    LikeMutation,
    {
      variables: {
        id: recipe?.id,
      },
    }
  );

  useEffect(() => {
    if (recipe) {
      setLiked(recipe.likedByUser);
      setCount(recipe.likes);
    }
  }, [recipe]);

  useEffect(() => {
    if (data?.like) {
      setLiked(data.like.state);
      setCount(data.like.count);
    }
  }, [data]);

  return {
    likeRecipe,
    error,
    count,
    icon: liked ? (
      <Icon icon="icon-park-solid:like" />
    ) : (
      <Icon icon="icon-park-outline:like" />
    ),
  };
};

export default useLike;
