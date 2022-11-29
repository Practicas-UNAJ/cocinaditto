import { FirebaseError } from "firebase/app";
import { firebaseErrors } from "../modules/zod/messages";

export const formatServerError = (error: Error) => {
  let formattedError;

  if (error instanceof FirebaseError) {
    formattedError = firebaseErrors[error.code];
  }

  return formattedError;
};
