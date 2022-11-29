import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { LikeMutation } from "../apollo/mutations";
import { LikeData, LikeVars } from "../apollo/types";

const useLike = (id: string, state: boolean) => {
  const [liked, setLiked] = useState(state);
  const [likeRecipe, { data, error }] = useMutation<LikeData, LikeVars>(
    LikeMutation,
    {
      variables: {
        id,
      },
    }
  );

  useEffect(() => {
    if (data?.like) setLiked(data.like);
  }, [data]);

  return {
    likeRecipe,
    error,
    icon: liked ? (
      <Icon icon="icon-park-solid:like" />
    ) : (
      <Icon icon="icon-park-outline:like" />
    ),
  };
};

export default useLike;
