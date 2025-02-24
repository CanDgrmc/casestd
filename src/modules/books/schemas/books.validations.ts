import Joi from "joi";
export const CreateBookValidation = {
  name: Joi.string().min(2).max(50).required(),
};
