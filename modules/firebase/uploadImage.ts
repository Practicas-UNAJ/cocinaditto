import app from "../../libs/firebaseApp";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

const uploadImage = async (data: Buffer | string, path: string) => {
  const storageRef = ref(app.storage, path);
  let uploadResult = null;

  if (data instanceof Buffer)
    uploadResult = await uploadBytes(storageRef, data, {
      contentType: "image/png",
    });
  else if (typeof data === "string") {
    uploadResult = await uploadString(storageRef, data, "data_url", {
      contentType: "image/png",
    });
  }

  const downloadUrl = await getDownloadURL(storageRef);

  return { uploadResult, downloadUrl };
};

export default uploadImage;
