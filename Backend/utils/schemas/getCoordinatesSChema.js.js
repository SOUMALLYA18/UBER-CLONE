const Joi = require("joi");

const getCoordinatesSchema = Joi.object({
  address: Joi.string().min(5).required().messages({
    "string.base": "Address must be a string.",
    "string.min": "Address must be at least 5 characters long.",
    "any.required": "Address is required.",
  }),
});

module.exports = {
  getCoordinatesSchema,
};
