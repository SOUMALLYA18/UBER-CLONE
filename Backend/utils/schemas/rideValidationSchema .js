const rideValidationSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "User ID must be a string",
    "any.required": "User ID is required",
  }),
  pickupLocation: Joi.string().min(3).required().messages({
    "string.base": "Pickup location must be a string",
    "string.min": "Pickup location must be at least 3 characters long",
    "any.required": "Pickup location is required",
  }),
  dropLocation: Joi.string().min(3).required().messages({
    "string.base": "Drop location must be a string",
    "string.min": "Drop location must be at least 3 characters long",
    "any.required": "Drop location is required",
  }),
  //   vehicleType: Joi.string().valid("auto", "car", "moto").required().messages({
  //     "string.base": "Vehicle type must be a string",
  //     "any.only": "Vehicle type must be one of [auto, car, moto]",
  //     "any.required": "Vehicle type is required",
  //   }),
});

module.exports = { rideValidationSchema };
