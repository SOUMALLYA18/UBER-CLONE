const Joi = require("joi");

const confirmRideSchema = Joi.object({
  rideId: Joi.string().hex().length(24).required().messages({
    "string.hex": "Ride ID must be a valid MongoDB ObjectId.",
    "string.length": "Ride ID must be 24 characters long.",
    "any.required": "Ride ID is required.",
  }),
});

module.exports = {
  confirmRideSchema,
};
