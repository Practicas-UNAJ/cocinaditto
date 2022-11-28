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
import { twMerge } from "tailwind-merge";
import { blobToDataUrl } from "../../utils/blobToDataUrl";
import { RecipeImage } from "../recipes/RecipeImage";
import { UserImage } from "../UserImage";

type ImageInputProps = {
  type: string;
  error?: string;
};
type ImageInputHandle = {
  imageDataURL: string | null;
};

enum Images {
  USER = "USER",
  RECIPE = "RECIPE",
}

type Types = {
  [key in Images as string]: ReactNode;
};

const ImageInput: React.ForwardRefRenderFunction<
  ImageInputHandle,
  ImageInputProps
> = ({ type, error }, ref) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [imageDataURL, setImageDataURL] = useState<string>("");
  const [imageURI, setImageURI] = useState<string>("");
  const imageTypes: Types = {
    [Images.RECIPE]: <RecipeImage image={imageURI} />,
    [Images.USER]: <UserImage image={imageURI} />,
  };

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
    <>
      <div
        className={twMerge(
          "relative group object-cover w-full",
          error && "border-2 border-danger-900 rounded-md"
        )}
      >
        {imageTypes[type]}
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
      {error && (
        <p className="relative -mt-[1rem] left-1/2 -translate-x-1/2 text-center text-danger-900 text-sm w-full">
          {error}
        </p>
      )}
    </>
  );
};

export default forwardRef(ImageInput);
