import { z } from "zod";
import { zodMessages } from "../messages";

export const editUserSchema = z.object({
  username: z.string({ required_error: zodMessages.EMPTY_FIELD }).optional(),
  thumbnail: z.string({ required_error: zodMessages.EMPTY_FIELD }).optional(),
  country: z.string({ required_error: zodMessages.EMPTY_FIELD }).optional(),
});
