const Joi = require("joi");

const validateLogin = (loginData) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  });

  return schema.validate(loginData);
};

module.exports = { validateLogin };
