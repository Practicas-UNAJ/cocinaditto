import { z } from "zod";
import { zodMessages } from "../messages";

export const loginSchema = z.object({
  email: z.string({ required_error: zodMessages.EMPTY_FIELD }).email({
    message: zodMessages.INVALID_EMAIL,
  }),
  password: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(6, {
    message: zodMessages.PASSWORD_MIN_CHAR,
  }),
});

export const registerSchema = z
  .object({
    email: z.string({ required_error: zodMessages.EMPTY_FIELD }).email({
      message: zodMessages.INVALID_EMAIL,
    }),
    username: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(1, {
      message: zodMessages.MIN_CHAR,
    }),
    password: z.string({ required_error: zodMessages.EMPTY_FIELD }).min(6, {
      message: zodMessages.PASSWORD_MIN_CHAR,
    }),
    confirmPassword: z
      .string({ required_error: zodMessages.EMPTY_FIELD })
      .min(6, {
        message: zodMessages.PASSWORD_MIN_CHAR,
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: zodMessages.PASSWORD_MISMATCHING,
    path: ["password+confirmPassword"],
  });
