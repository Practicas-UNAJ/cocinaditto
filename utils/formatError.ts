import { ZodError, ZodIssue } from "zod";
import CocinadittoError from "../interfaces/CocinadittoError";

export const formatError = (_error: Error): CocinadittoError[] => {
  let formattedError: CocinadittoError[] = [];
  let error: Error | CocinadittoError[] = _error;

  console.log(error);

  if (!(error instanceof ZodError))
    error = JSON.parse(error.message) as CocinadittoError[];

  if (Array.isArray(error) && error instanceof Array<CocinadittoError>) {
    error.forEach((err) => {
      formattedError = {
        ...formattedError,
        [err.field]: err.message,
      };
    });
  }
  if (error instanceof ZodError) {
    error.errors.forEach((err: ZodIssue) => {
      let error: CocinadittoError | CocinadittoError[] = new CocinadittoError(
        err.path[0] as string,
        err.message
      );

      formattedError = formattedError.concat(error);
    });
  }

  return formattedError;
};
