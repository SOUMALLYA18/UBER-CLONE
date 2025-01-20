const Joi = require("joi");

const getDistanceTimeSchema = Joi.object({
  origin: Joi.string().min(3).required(),
  destination: Joi.string().min(3).required(),
});


module.exports = getDistanceTimeSchema;
