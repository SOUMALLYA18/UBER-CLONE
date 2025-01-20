const Joi = require("joi");

const getDistanceTimeSchema = Joi.object({
  origin: Joi.string().required().messages({
    "string.base": "Origin must be a string.",
    "any.required": "Origin is required.",
  }),
  destination: Joi.string().required().messages({
    "string.base": "Destination must be a string.",
    "any.required": "Destination is required.",
  }),
});

const validateDistanceTime = (query) => {
  return getDistanceTimeSchema.validate(query);
};
module.exports = { validateDistanceTime };
