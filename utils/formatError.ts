import Joi from "joi";

const formatError = (error: Error) => {
  if (error instanceof Joi.ValidationError) {
    const errors = error.details.map((err) => {
      return {
        message: err.message,
        field: err.context!.key,
      };
    });

    return errors;
  }
};

export default formatError;
