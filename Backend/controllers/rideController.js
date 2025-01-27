const rideService = require("../services/rideService");
const mapService = require("../services/mapsService");
const {
  rideValidationSchema,
} = require("../utils/schemas/rideValidationSchema ");

const validateRequest = require("../utils/validateRequest");
const getDistanceTimeSchema = require("../utils/schemas/getDistanceTimeSchemas");
const { sendMessageToSocketId } = require("../Socket");
const rideModel = require("../models/rideModel");
const { confirmRideSchema } = require("../utils/schemas/confirmRideSchema");
const { startRideSchema } = require("../utils/schemas/startRideSchema");
const endRideSchema = require("../utils/schemas/endRideSchema");
const endrideSchema = require("../utils/schemas/endRideSchema");
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

    const pickupCoordinates = await mapService.getAddressCoordinate(
      validatedData.pickup
    );

    const { lat, lng } = pickupCoordinates; // Renaming 'ltd' to 'lat' if needed
    if (!lat || !lng) {
      return res.status(400).json({ error: "Invalid pickup coordinates" });
    }
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    const captainInRadius = await mapService.getCaptainInTheRadius(
      lat,
      lng,
      10
    );

    ride.otp = "";
    captainInRadius.map((captain) =>
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      })
    );

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
      return res.status(404).json({
        error: "No routes found",
        message: "No routes available between the selected locations",
      });
    }
    return res
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
      return res.status(404).json({
        error: "No routes found",
        message: "No routes available between the selected locations",
      });
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports.confirmRide = async (req, res, next) => {
  const { error } = confirmRideSchema.validate(req.body);

  if (error) {
    console.error("Validation Error:", error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error("Error in confirmRide:", err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res, next) => {
  const { error } = startRideSchema.validate(req.query);

  if (error) {
    console.error("Validation Error:", error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error("Error in startRide:", err); // Log the error for debugging purposes
    return res.status(500).json({ message: err.message });
  }
};

module.exports.endRide = async (req, res, next) => {
  const { error } = endrideSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { rideId } = req.body;

    const ride = await rideService.endRide({ rideId, captain: req.captain });

    if (ride?.user?.socketId) {
      sendMessageToSocketId(ride?.user.socketId, {
        event: "ride-ended",
        data: ride,
      });
    }

    return res.status(200).json(ride);
  } catch (err) {
    console.error("Error in endRide:", err); // Debugging error
    return res.status(500).json({ message: err.message });
  }
};
