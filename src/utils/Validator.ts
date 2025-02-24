import Joi from "joi";

export default function (schema: object, input?: object) {
  return Joi.object().keys(schema).validate(input);
}
