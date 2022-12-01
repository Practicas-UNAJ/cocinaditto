import Head from "next/head";
import { ElementRef, ReactElement, useEffect, useRef, useState } from "react";
import { FlagCheckbutton } from "../../components/Cocinaditto/FlagCheckbutton";
import { CocinadittoTitle } from "../../components/Cocinaditto/Title";
import { MainLayout } from "../../components/layouts/MainLayout";
import { RecipeImage } from "../../components/recipes/RecipeImage";
import { NextPageWithLayout } from "../_app";
import veganIcon from "../../assets/images/vegan.png";
import glutenFreeIcon from "../../assets/images/gluten-free.png";
import useRecipePage from "../../hooks/useRecipePage";
import { useRouter } from "next/router";
import useLike from "../../hooks/useLike";
import LoadingSpinner, { SpinnerType } from "../../components/LoadingSpinner";
import RecipeContent from "../../components/RecipeContent";
import { EInfoView } from "../../enums/InfoView";
import ImageInput from "../../components/Cocinaditto/ImageInput";
import { CocinadittoInput } from "../../components/Cocinaditto/Input";
import { Icon } from "@iconify/react";
import RichTextEditor from "../../components/RichTextEditor";
import useModal from "../../hooks/useModal";
import useDeleteRecipe from "../../hooks/useDeleteRecipe";
import { EModals } from "../../enums/modals";
import useForm from "../../hooks/useForm";
import { editRecipeSchema } from "../../modules/zod/schemas/Recipe";
import useEditRecipe from "../../hooks/useEditRecipe";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { Recipe } from "../../modules/graphql/types/interfaces";

type ImageInputHandle = ElementRef<typeof ImageInput>;

interface IEditRecipeForm {
  title: string;
  thumbnail: string;
  country: string;
  content: string;
  portions: string | number;
  cooking_time: string | number;
  isVegan: boolean;
  glutenFree: boolean;
}

const Page: NextPageWithLayout = () => {
  const { setModal, unsetModal } = useModal();
  const router = useRouter();
  const imageRef = useRef<ImageInputHandle>(null);
  const { recipe, isLoading } = useRecipePage(router.query.id as string);
  const { currentUser } = useAuth();
  const { deleteRecipe } = useDeleteRecipe(router.query.id as string);
  const [infoState, setInfoState] = useState<EInfoView>();
  const [ready, setReady] = useState(false);
  const { form, errors, onChange, submit, updateForm } =
    useForm<IEditRecipeForm>({ schema: editRecipeSchema });
  const { editRecipe } = useEditRecipe(
    { payload: form },
    router.query.id as string
  );
  const { icon: likeIcon, likeRecipe, count } = useLike(recipe as Recipe);

  useEffect(() => {
    if (recipe) {
      setInfoState(recipe.isOwner ? EInfoView.OWNER : EInfoView.USER);

      updateForm({
        content: recipe.content,
        cooking_time: `${recipe.cooking_time}`,
        country: recipe.country,
        glutenFree: recipe.glutenFree,
        isVegan: recipe.isVegan,
        portions: `${recipe.portions}`,
        thumbnail: recipe.thumbnail,
        title: recipe.title,
      });
    }
  }, [recipe]);

  const submitWrapper = () => {
    let parsedData: Partial<IEditRecipeForm> = {
      cooking_time: parseInt(form.cooking_time as string),
      portions: parseInt(form.portions as string),
    };

    updateForm({ ...form, ...parsedData });

    if (imageRef.current?.imageDataURL)
      updateForm({ thumbnail: imageRef.current.imageDataURL });

    setReady(true);
  };

  useEffect(() => {
    if (ready) {
      editRecipe();

      if (!errors) setInfoState(EInfoView.OWNER);
    }
  }, [ready]);

  if (isLoading) return <LoadingSpinner type={SpinnerType.LARGE} />;

  return recipe ? (
    <>
      <Head>
        <title>Cocinaditto | {recipe.title}</title>
      </Head>
      {infoState === EInfoView.EDIT ? (
        <form className="flex flex-col gap-5">
          <CocinadittoTitle text="Editar receta" />
          <div className="flex flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={(ev) => {
                setModal(ev, EModals.DELETE, {
                  onAccept: () => {
                    deleteRecipe();
                    unsetModal();
                  },
                });
              }}
              className="rounded-full w-12 h-12 p-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-danger-600"
            >
              <Icon icon="bi:trash" className="w-full h-full font-bold" />
            </button>
            <button
              type="submit"
              onClick={(ev) => submit({ ev, func: submitWrapper })}
              className="rounded-full w-12 h-12 p-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]  bg-secondary-500"
            >
              <Icon
                icon="material-symbols:save-as-outline-rounded"
                className="w-full h-full font-bold"
              />
            </button>
          </div>
          <ImageInput
            initialValue={recipe.thumbnail}
            ref={imageRef}
            type="RECIPE"
            error={errors?.thumbnail}
          />
          <CocinadittoInput
            className="w-full bg-brown-500 placeholder:text-brown-700"
            type="text"
            name="title"
            placeholder={recipe.title}
            onChange={onChange}
            error={errors?.title}
          />
          <div className="flex flex-row gap-5 items-center">
            <div className="w-1/3 flex flex-row gap-3 items-center">
              <Icon className="min-w-max" icon="bxs:time-five" />
              <CocinadittoInput
                className="w-full bg-brown-500 placeholder:text-brown-700"
                type="text"
                placeholder={`${recipe.cooking_time}`}
                onChange={onChange}
                name="cooking_time"
                error={errors?.portions as string}
                min={1}
              />
            </div>
            <div className="w-1/3 flex flex-row gap-3 items-center">
              <Icon className="min-w-max" icon="bx:world" />
              <CocinadittoInput
                className="w-full bg-brown-500 placeholder:text-brown-700"
                type="text"
                placeholder={recipe.country}
                onChange={onChange}
                name="country"
                error={errors?.country}
              />
            </div>
            <div className="w-1/3 flex flex-row gap-3 items-center">
              <Icon className="min-w-max" icon="fa6-solid:pizza-slice" />
              <CocinadittoInput
                className="w-full bg-brown-500 placeholder:text-brown-700"
                type="text"
                placeholder={`${recipe.portions}`}
                onChange={onChange}
                min={1}
                name="portions"
                error={errors?.portions as string}
              />
            </div>
          </div>

          <div className="flex flex-row gap-5 justify-center">
            <FlagCheckbutton
              image={glutenFreeIcon}
              state={form.glutenFree}
              setState={() => updateForm({ glutenFree: !form.glutenFree })}
            />
            <FlagCheckbutton
              image={veganIcon}
              state={form.isVegan}
              setState={() => updateForm({ isVegan: !form.isVegan })}
            />
          </div>

          <RichTextEditor
            initialContent={form.content}
            cb={(content: string) => updateForm({ ...form, content })}
            error={errors?.content}
          />
        </form>
      ) : (
        <>
          <RecipeImage image={recipe.thumbnail} />
          <CocinadittoTitle text={recipe.title} />

          <Link href={`/user/${recipe.author.id}`}>
            <span className="text-center font-extralight">
              Publicado por: {recipe.author.username}
            </span>
          </Link>

          {infoState === EInfoView.OWNER && (
            <div className="flex flex-row gap-3 justify-center">
              <button
                onClick={(ev) => {
                  setModal(ev, EModals.DELETE, {
                    onAccept: deleteRecipe,
                  });
                }}
                className="rounded-full w-12 h-12 p-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-danger-600"
              >
                <Icon icon="bi:trash" className="w-full h-full font-bold" />
              </button>
              <button
                onClick={() => setInfoState(EInfoView.EDIT)}
                className="rounded-full w-12 h-12 p-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]  bg-secondary-500"
              >
                <Icon icon="bxs:pencil" className="w-full h-full font-bold" />
              </button>
            </div>
          )}

          <div className="flex flex-row gap-5 justify-center">
            <FlagCheckbutton image={glutenFreeIcon} state={recipe.glutenFree} />
            <FlagCheckbutton image={veganIcon} state={recipe.isVegan} />
          </div>

          <RecipeContent content={recipe.content} />

          <div className="flex flex-row text-brown-900 justify-center items-center gap-2">
            <button
              onClick={(ev) => {
                if (currentUser) likeRecipe();
                else setModal(ev, EModals.LOGIN);
              }}
            >
              {likeIcon}
            </button>
            {count}
          </div>
        </>
      )}
    </>
  ) : (
    <></>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Page;
