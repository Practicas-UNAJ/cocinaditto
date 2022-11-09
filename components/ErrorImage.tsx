import error from "../assets/images/error.png";
import Image, { StaticImageData } from "next/image";

export enum ErrorImageType {
  SMALL,
  LARGE,
}

interface ErrorImageProps {
  type: ErrorImageType;
}

export default function ErrorImage({ type }: ErrorImageProps) {
  switch (type) {
    case ErrorImageType.SMALL:
      return (
        <div className="h-full w-full flex items-center justify-center">
          <Image src={error} objectFit="fill" height={150} width={150} />
        </div>
      );
    case ErrorImageType.LARGE:
      return (
        <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
          <Image
            src={error as StaticImageData}
            objectFit="cover"
            height={250}
            width={250}
          />
        </div>
      );
    default:
      return <></>;
  }
}
