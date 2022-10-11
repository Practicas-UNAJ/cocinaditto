import messages from "./messages";
import Joi from "joi";

export const createRecipe = Joi.object().keys({
  title: Joi.string().min(1).required().messages(messages.recipe.title),
  thumbnail: Joi.string().required().messages(messages.recipe.thumbnail),
  country: Joi.string().required().messages(messages.recipe.country),
  content: Joi.string().min(1).required().messages(messages.recipe.content),
  portions: Joi.number().min(1).required().messages(messages.recipe.portions),
  cooking_time: Joi.number()
    .min(1)
    .required()
    .messages(messages.recipe.cooking_time),
  isVegan: Joi.boolean(),
  glutenFree: Joi.boolean(),
});

export const editRecipe = Joi.object().keys({
  id: Joi.string().uuid().required().messages(messages.recipe.id),
  title: Joi.string().min(1).messages(messages.recipe.title),
  thumbnail: Joi.string().messages(messages.recipe.thumbnail),
  country: Joi.string().messages(messages.recipe.country),
  content: Joi.string().min(1).messages(messages.recipe.content),
  portions: Joi.number().min(1).messages(messages.recipe.portions),
  cooking_time: Joi.number().min(1).messages(messages.recipe.cooking_time),
  isVegan: Joi.boolean(),
  glutenFree: Joi.boolean(),
});

export const deleteRecipe = Joi.object().keys({
  id: Joi.string().uuid().required().messages(messages.recipe.id),
});
