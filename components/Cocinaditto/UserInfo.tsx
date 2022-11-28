import { Icon } from "@iconify/react";
import { ElementRef, FunctionComponent, useRef, useState } from "react";
import { EInfoView } from "../../enums/InfoView";
import { UserImage } from "../UserImage";
import ImageInput from "./ImageInput";
import { CocinadittoInput } from "./Input";

interface IDatoData {
  view: EInfoView
  username: string
  thumbnail: string
  recipes: number
}

type ImageInputHandle = ElementRef<typeof ImageInput>;

export const UserInfo: FunctionComponent<IDatoData> = (props) => {
  const imageRef = useRef<ImageInputHandle>(null);
  const [ infoState, setInfoState ] = useState<EInfoView>(EInfoView.OWNER)
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-7">
      { infoState === EInfoView.EDIT ?
        <ImageInput ref={imageRef} type="USER" /> :
        <UserImage image={props.thumbnail} />
      }
        <div className="flex flex-col justify-around items-end gap-6">
          { infoState === EInfoView.EDIT ?
            <CocinadittoInput placeholder="Nombre" className="bg-brown-500 placeholder:text-brown-700 w-max"/> :
            <span className="font-semibold text-xl">{props.username}</span>
          }
          <div className="flex flex-row items-center gap-1">
            <Icon icon="bx:world" className="w-6 h-6" />
            {infoState === EInfoView.EDIT ?
              <CocinadittoInput placeholder="País o región" className="bg-brown-500 placeholder:text-brown-700 w-max"/>:
              <span>Argentina papa</span>
            }
          </div>
          <span className="self-center sm:self-auto">{props.recipes} recetas</span>
          {
            infoState === EInfoView.OWNER &&
            <button
              onClick={() => setInfoState(EInfoView.EDIT)}
              className="bg-secondary-500 p-2 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] self-center sm:self-auto"
            >
              <Icon icon="bxs:pencil" className="w-6 h-6" />
            </button>
          }
          {infoState === EInfoView.EDIT &&
            <button
              onClick={() => setInfoState(EInfoView.OWNER)}
              className="bg-secondary-500 p-2 rounded-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] self-center sm:self-auto"
            >
              <Icon icon="material-symbols:save-as-outline-rounded" className="w-6 h-6" />
            </button>
          }
        </div>
      </div>
  )
}