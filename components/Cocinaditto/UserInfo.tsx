import { Icon } from "@iconify/react";
import {
  ElementRef,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { EInfoView } from "../../enums/InfoView";
import useEditUser from "../../hooks/useEditUser";
import useForm from "../../hooks/useForm";
import { IUser } from "../../interfaces/user";
import { editUserSchema } from "../../modules/zod/schemas/User";
import { UserImage } from "../UserImage";
import ImageInput from "./ImageInput";
import { CocinadittoInput } from "./Input";

interface IDatoData {
  user: IUser;
}

type ImageInputHandle = ElementRef<typeof ImageInput>;

interface IUserForm {
  username: string;
  country?: string;
  thumbnail?: string;
}

export const UserInfo: FunctionComponent<IDatoData> = ({ user }) => {
  const imageRef = useRef<ImageInputHandle>(null);
  const [infoState, setInfoState] = useState<EInfoView>(EInfoView.OWNER);
  const { form, errors, onChange, submit, updateForm } = useForm<IUserForm>({
    schema: editUserSchema,
  });
  const { editUser } = useEditUser({ payload: form }, user.id);
  const [ready, setReady] = useState(false);

  const submitWrapper = () => {
    if (imageRef.current?.imageDataURL)
      updateForm({ ...form, thumbnail: imageRef.current.imageDataURL });

    setReady(true);
  };

  useEffect(() => {
    if (ready) editUser();
  }, [ready]);

  return (
    <form className="flex flex-col sm:flex-row justify-around">
      {infoState === EInfoView.EDIT ? (
        <ImageInput
          initialValue={user.thumbnail}
          ref={imageRef}
          type="USER"
          error={errors?.thumbnail}
        />
      ) : (
        <UserImage image={user.thumbnail} />
      )}
      <div className="flex flex-col justify-between h-full">
        {infoState === EInfoView.EDIT ? (
          <CocinadittoInput
            placeholder="Nombre"
            className="bg-brown-500 placeholder:text-brown-700 w-full"
            error={errors?.username}
            name="username"
            onChange={onChange}
          />
        ) : (
          <span className="font-semibold text-3xl">{user.username}</span>
        )}
        <div className="flex flex-col gap-2 mt-10 ">
          <div className="flex flex-row items-center gap-1">
            <Icon icon="bx:world" className="w-6 h-6" />
            {infoState === EInfoView.EDIT ? (
              <CocinadittoInput
                placeholder="País o región"
                className="bg-brown-500 placeholder:text-brown-700 w-full"
                error={errors?.country}
                name="country"
                onChange={onChange}
              />
            ) : (
              <span>{user.country ?? "Desconocido"}</span>
            )}
          </div>
          <span className="flex flex-row items-center gap-1">
            <Icon icon="bxs:note" className="w-6 h-6" />
            {user.recipeCount} recetas
          </span>
          {infoState === EInfoView.OWNER && (
            <button
              type="button"
              onClick={() => setInfoState(EInfoView.EDIT)}
              className="bg-secondary-500 p-2 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] self-end mt-[8rem]"
            >
              <Icon icon="bxs:pencil" className="w-6 h-6" />
            </button>
          )}
          {infoState === EInfoView.EDIT && (
            <button
              type="submit"
              onClick={() => {
                submit({ func: submitWrapper });
                setInfoState(EInfoView.OWNER);
              }}
              className="bg-secondary-500 p-2 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] self-end mt-[8rem]"
            >
              <Icon
                icon="material-symbols:save-as-outline-rounded"
                className="w-6 h-6"
              />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
