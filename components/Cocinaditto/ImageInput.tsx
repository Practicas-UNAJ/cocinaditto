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
  initialValue?: string;
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
> = ({ type, error, initialValue }, ref) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [imageDataURL, setImageDataURL] = useState<string>();
  const [imageURI, setImageURI] = useState<string>("");
  const [imageTypes, setImageTypes] = useState<Types>();

  useImperativeHandle(ref, () => ({
    imageDataURL: imageDataURL as string,
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
    URL.revokeObjectURL(imageURI as string);
    setImageDataURL("");
    setImageURI("");
  };

  useEffect(() => {
    setImageTypes({
      [Images.RECIPE]: <RecipeImage image={imageURI} />,
      [Images.USER]: <UserImage image={imageURI} />,
    });
  }, [imageURI]);

  useEffect(() => {
    setImageURI(initialValue ?? "");
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
        {imageTypes && imageTypes[type]}
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
