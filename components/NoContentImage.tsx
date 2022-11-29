import noContent from "../assets/images/no_content.png";
import Image, { StaticImageData } from "next/image";

export enum NoContentImageType {
  SMALL,
}

interface NoContentImageProps {
  type: NoContentImageType;
}

export default function NoContentImage({ type }: NoContentImageProps) {
  switch (type) {
    case NoContentImageType.SMALL:
      return (
        <div className="h-full w-full flex items-center justify-center">
          <Image src={noContent} objectFit="fill" height={150} width={150} />
        </div>
      );
    default:
      return <></>;
  }
}
