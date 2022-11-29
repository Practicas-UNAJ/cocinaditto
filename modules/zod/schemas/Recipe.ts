import { z } from "zod";
import { zodMessages } from "../messages";

export const recipeSchema = z.object({
  title: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
    message: zodMessages.MIN_CHAR,
  }),
  thumbnail: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
    message: zodMessages.MIN_CHAR,
  }),
  country: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
    message: zodMessages.MIN_CHAR,
  }),
  content: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
    message: zodMessages.MIN_CHAR,
  }),
  portions: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
    message: zodMessages.MIN_CHAR,
  }),
  cooking_time: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
    message: zodMessages.MIN_CHAR,
  }),
  isVegan: z.boolean({ required_error: zodMessages.EMPTY_FIELD }),
  glutenFree: z.boolean({ required_error: zodMessages.EMPTY_FIELD }),
});

export const editRecipeSchema = z.object({
  title: z
    .string({ required_error: zodMessages.EMPTY_FIELD })
    .min(1, {
      message: zodMessages.MIN_CHAR,
    })
    .optional(),
  thumbnail: z
    .string({ required_error: zodMessages.EMPTY_FIELD })
    .min(1, {
      message: zodMessages.MIN_CHAR,
    })
    .optional(),
  country: z
    .string({ required_error: zodMessages.EMPTY_FIELD })
    .min(1, {
      message: zodMessages.MIN_CHAR,
    })
    .optional(),
  content: z
    .string({ required_error: zodMessages.EMPTY_FIELD })
    .min(1, {
      message: zodMessages.MIN_CHAR,
    })
    .optional(),
  portions: z
    .string({ required_error: zodMessages.EMPTY_FIELD })
    .min(1, {
      message: zodMessages.MIN_CHAR,
    })
    .optional(),
  cooking_time: z
    .string({ required_error: zodMessages.EMPTY_FIELD })
    .min(1, {
      message: zodMessages.MIN_CHAR,
    })
    .optional(),
  isVegan: z.boolean({ required_error: zodMessages.EMPTY_FIELD }).optional(),
  glutenFree: z.boolean({ required_error: zodMessages.EMPTY_FIELD }).optional(),
});
