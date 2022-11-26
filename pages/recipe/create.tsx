import { ElementRef, ReactElement, useEffect, useRef, useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import { NextPageWithLayout } from "../_app";
import { CocinadittoTitle } from "../../components/Cocinaditto/Title";
import ImageInput from "../../components/Cocinaditto/ImageInput";
import { Icon } from "@iconify/react";
import { CocinadittoInput } from "../../components/Cocinaditto/Input";
import Head from "next/head";
import { FlagCheckbutton } from "../../components/Cocinaditto/FlagCheckbutton";
import glutenFreeIcon from "../../assets/images/gluten-free.png";
import RichTextEditor from "../../components/RichTextEditor";
import veganIcon from "../../assets/images/vegan.png";
import useAuth from "../../hooks/useAuth";
import Router from "next/router";
import useForm from "../../hooks/useForm";
import useCreateRecipe from "../../hooks/useCreateRecipe";

type ImageInputHandle = ElementRef<typeof ImageInput>;

interface ICreateRecipeForm {
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
  const [ready, setReady] = useState(false);
  const imageRef = useRef<ImageInputHandle>(null);
  const { form, submit, updateForm, onChange } = useForm<ICreateRecipeForm>({
    initialValue: {
      glutenFree: false,
      isVegan: false,
    },
  });
  const { currentUser } = useAuth();
  const { createRecipe } = useCreateRecipe(form);

  if (!currentUser) Router.push("/");

  const submitWrapper = () => {
    let parsedData: Partial<ICreateRecipeForm> = {
      cooking_time: parseInt(form.cooking_time as string),
      portions: parseInt(form.portions as string),
    };

    updateForm({ ...form, ...parsedData });
    setReady(true);
  };

  useEffect(() => {
    if (ready) createRecipe();
  }, [ready]);

  useEffect(() => {
    if (imageRef.current?.imageDataURL)
      updateForm({ ...form, thumbnail: imageRef.current.imageDataURL });
  }, [imageRef.current?.imageDataURL]);

  return (
    <>
      <Head>
        <title>Cocinaditto | Publicar una receta</title>
      </Head>
      <CocinadittoTitle text="Publicar receta" />
      <form
        className="flex flex-col gap-5"
        onSubmit={(ev) => submit({ ev, func: submitWrapper })}
      >
        <ImageInput ref={imageRef} />
        <CocinadittoInput
          className="w-full bg-brown-500 placeholder:text-brown-700"
          type="text"
          name="title"
          placeholder="Nombre"
          onChange={onChange}
        />
        <div className="flex flex-row gap-5 items-center">
          <div className="w-1/3 flex flex-row gap-3 items-center">
            <Icon className="min-w-max" icon="bxs:time-five" />
            <CocinadittoInput
              className="w-full bg-brown-500 placeholder:text-brown-700"
              type="number"
              placeholder="Tiempo"
              name="cooking_time"
              min={1}
              onChange={onChange}
            />
          </div>
          <div className="w-1/3 flex flex-row gap-3 items-center">
            <Icon className="min-w-max" icon="bx:world" />
            <CocinadittoInput
              className="w-full bg-brown-500 placeholder:text-brown-700"
              type="text"
              placeholder="País o región"
              onChange={onChange}
              name="country"
            />
          </div>
          <div className="w-1/3 flex flex-row gap-3 items-center">
            <Icon className="min-w-max" icon="fa6-solid:pizza-slice" />
            <CocinadittoInput
              className="w-full bg-brown-500 placeholder:text-brown-700"
              type="number"
              placeholder="Porciones"
              min={1}
              onChange={onChange}
              name="portions"
            />
          </div>
        </div>

        <div className="flex flex-row gap-5 justify-center">
          <FlagCheckbutton
            image={glutenFreeIcon}
            state={form.glutenFree}
            setState={() =>
              updateForm({ ...form, glutenFree: !form.glutenFree })
            }
          />
          <FlagCheckbutton
            image={veganIcon}
            state={form.isVegan}
            setState={() => updateForm({ ...form, isVegan: !form.isVegan })}
          />
        </div>

        <RichTextEditor
          cb={(content: string) => updateForm({ ...form, content })}
        />

        <button className="rounded-full bg-secondary-500 text-brown-900 font-semibold w-fit p-3 place-self-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          Publicar
        </button>
      </form>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Page;
