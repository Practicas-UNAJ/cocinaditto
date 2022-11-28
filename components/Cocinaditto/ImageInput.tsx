import {
  ChangeEventHandler,
  forwardRef,
  MutableRefObject,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { blobToDataUrl } from "../../utils/blobToDataUrl";
import { RecipeImage } from "../recipes/RecipeImage";
import { UserImage } from "../UserImage";

type ImageInputProps = {
  type: string
};
type ImageInputHandle = {
  imageDataURL: string | null;
};

enum Images {
  USER = "USER",
  RECIPE = "RECIPE"
}

type Types = {
  [key in Images as string]: ReactNode;
}

const ImageInput: React.ForwardRefRenderFunction<
  ImageInputHandle,
  ImageInputProps
> = (_, ref) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [imageDataURL, setImageDataURL] = useState<string>("");
  const [imageURI, setImageURI] = useState<string>("");
  const imageTypes: Types = {
    [Images.RECIPE]: (
      <RecipeImage image={imageDataURL} />
    ),
    [Images.USER]: (
      <UserImage image={imageDataURL} />
    ),
  }

  useImperativeHandle(ref, () => ({
    imageDataURL,
  }));

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = async (
    ev
  ) => {
    if (ev.target.files) {
      const dataUrl = await blobToDataUrl(ev.target.files[0]);
      const uri = URL.createObjectURL(ev.target.files[0]);

      setImageURI(uri);
      setImageDataURL(dataUrl);
    }
  };

  const revokeImage = () => {
    URL.revokeObjectURL(imageURI);
    setImageDataURL("");
    setImageURI("");
  };

  useEffect(() => {
    return () => revokeImage();
  }, []);

  return (
    <div className="relative group object-cover w-full">
      {imageTypes[_.type]}
      <div className="absolute top-0 left-0 grid items-center justify-center w-full h-full">
        <input
          onChange={handleImageChange}
          ref={inputRef}
          max={1}
          type="file"
          className="absolute w-full h-full opacity-0"
        />
      </div>
    </div>
  );
};

export default forwardRef(ImageInput);
