const Joi = require("joi");

const endrideSchema = Joi.object({
  rideId: Joi.string()
    .custom((value, helpers) => {
      if (!/^[0-9a-fA-F]{24}$/.test(value)) {
        return helpers.message("Invalid ride ID");
      }
      return value;
    })
    .required(),
});

module.exports = endrideSchema;
