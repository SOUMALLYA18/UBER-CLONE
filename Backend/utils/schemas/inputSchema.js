const Joi = require("joi");

const inputSchema = Joi.object({
  input: Joi.string().min(3).required(),
});

module.exports = { inputSchema };
