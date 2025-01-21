const Joi = require("joi");

const inputSchema = Joi.object({
  input: Joi.string().min(1).max(255).trim().required(),
});

module.exports = { inputSchema };
