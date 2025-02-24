import Joi from "joi";
export const CreateUserValidation = {
  name: Joi.string().min(2).max(20).required(),
};

export const BorrowBookValidation = {
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
};

export const BorrowBookCompleteProcessValidation = {
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
  score: Joi.number().required(),
};
