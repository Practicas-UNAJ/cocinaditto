import loadingSmall from "../assets/images/loading_small.gif";
import loadingLarge from "../assets/images/loading_large.gif";
import loadingLarge2 from "../assets/images/loading_large2.gif";
import Image, { StaticImageData } from "next/image";
import _ from "lodash";

export enum SpinnerType {
  SMALL,
  LARGE,
}

interface LoadingSpinnerProps {
  type: SpinnerType;
}

export default function LoadingSpinner({ type }: LoadingSpinnerProps) {
  switch (type) {
    case SpinnerType.SMALL:
      return (
        <div className="h-full w-full flex items-center justify-center">
          <Image src={loadingSmall} objectFit="fill" height={150} width={150} />
        </div>
      );
    case SpinnerType.LARGE:
      return (
        <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
          <Image
            src={_.sample([loadingLarge, loadingLarge2]) as StaticImageData}
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
