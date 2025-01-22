const rideService = require("../services/rideService");
const {
  rideValidationSchema,
} = require("../utils/schemas/rideValidationSchema ");

const validateRequest = require("../utils/validateRequest");
const getDistanceTimeSchema = require("../utils/schemas/getDistanceTimeSchemas");

module.exports.createRide = async (req, res, next) => {
  const { errors, value: validatedData } = validateRequest(
    rideValidationSchema,
    req.body
  );
  if (errors) {
    return res.status(400).json({ error: "Validation Error", details: errors });
  }
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup: validatedData.pickup,
      destination: validatedData.destination,
      vehicleType: validatedData.vehicleType,
    });

    res.status(201).json({ message: "Ride created successfully", ride });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports.getFare = async (req, res, next) => {
  const { error, value } = getDistanceTimeSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { origin, destination } = value;

  try {
    const fare = await rideService.getFare(origin, destination);
    return res.status(200).json(fare);
  } catch (error) {
    console.error("Error fetching fare:", error);
    if (error.message === "No routes found") {
      return res
        .status(404)
        .json({
          error: "No routes found",
          message: "No routes available between the selected locations",
        });
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
