import { toPng } from "jdenticon";

const generateImage = (value: string): Buffer => {
  const icon = toPng(value, 200, {
    backColor: "#FFFFFF",
  });

  return icon;
};

export default generateImage;
