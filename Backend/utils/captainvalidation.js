const Joi = require("joi");

const validateCaptain = (captainData) => {
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
    }).required(),

    email: Joi.string().email().min(5).required().messages({
      "string.email": "Please provide a valid email address",
      "string.min": "Email must be at least 5 characters long",
      "any.required": "Email is required",
    }),

    password: Joi.string().min(6).required().messages({
      "string.base": "Password must be a string",
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),

    status: Joi.string()
      .valid("active", "inactive")
      .default("inactive")
      .messages({
        "any.only": 'Status must be either "active" or "inactive"',
      }),

    vehicle: Joi.object({
      color: Joi.string().min(3).required().messages({
        "string.base": "Color must be a string",
        "string.min": "Color must be at least 3 characters long",
        "any.required": "Color is required",
      }),

      plate: Joi.string().min(3).required().messages({
        "string.base": "Plate must be a string",
        "string.min": "Plate must be at least 3 characters long",
        "any.required": "Plate is required",
      }),

      capacity: Joi.number().min(1).required().messages({
        "number.base": "Capacity must be a number",
        "number.min": "Capacity must be at least 1",
        "any.required": "Capacity is required",
      }),

      vehicleType: Joi.string()
        .valid("car", "motorcycle", "auto")
        .required()
        .messages({
          "any.only":
            'Vehicle type must be either "car", "motorcycle", or "auto"',
          "any.required": "Vehicle type is required",
        }),

      location: Joi.object({
        lat: Joi.number().min(-90).max(90).optional(),
        lng: Joi.number().min(-180).max(180).optional(),
      }).optional(),
    }).required(),
  });

  return schema.validate(captainData);
};

module.exports = { validateCaptain };
