const Joi = require("joi");

const startRideSchema = Joi.object({
  rideId: Joi.string().length(24).hex().required().messages({
    "string.length": "Invalid ride id",
    "string.hex": "Invalid ride id",
    "any.required": "Ride id is required",
  }),
  otp: Joi.string().length(4).required().messages({
    "string.length": "Invalid OTP",
    "any.required": "OTP is required",
  }),
});

module.exports = {
  startRideSchema,
};
