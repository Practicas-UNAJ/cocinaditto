import { useMutation } from "@apollo/client";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { SaveRecipeMutation } from "../apollo/mutations";
import { SaveData, SaveVars } from "../apollo/types";

const useSaveRecipe = (id: string, _saved: boolean) => {
  const [saved, setSaved] = useState(_saved);
  const [saveRecipe, { data, error }] = useMutation<SaveData, SaveVars>(
    SaveRecipeMutation,
    {
      variables: {
        id,
      },
    }
  );

  useEffect(() => {
    if (data?.save) setSaved(data.save);
  }, [data]);

  return {
    save: saveRecipe,
    error,
    icon: saved ? (
      <Icon icon="icon-park-solid:tag" />
    ) : (
      <Icon icon="icon-park-outline:tag" />
    ),
  };
};

export default useSaveRecipe;
