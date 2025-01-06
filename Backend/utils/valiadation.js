const Joi = require("joi");

const validateUser = (userData) => {
  const schema = Joi.object({
    fullname: Joi.object({
      firstname: Joi.string().min(3).required().messages({
        "string.base": "First name must be a string",
        "string.min": "First name must be at least 3 characters long",
        "any.required": "First name is required",
      }),
      lastname: Joi.string().min(3).required().messages({
        "string.base": "Last name must be a string",
        "string.min": "Last name must be at least 3 characters long",
        "any.required": "Last name is required",
      }),
    }),
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

  return schema.validate(userData);
};

module.exports = { validateUser };
