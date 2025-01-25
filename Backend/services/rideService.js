const rideModel = require("../models/rideModel");
const mapService = require("../services/mapsService");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../Socket");

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  // Ensure all required fields are present
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  // Get fare data for all vehicle types
  const fareData = await getFare(pickup, destination, vehicleType);

  // Extract the fare for the selected vehicle type
  const fare = fareData[vehicleType];

  // Ensure fare exists for the vehicle type
  if (!fare) {
    throw new Error(`Fare not found for vehicle type: ${vehicleType}`);
  }

  // Create a new ride in the database
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare, // Use the fare for the selected vehicle type
  });

  return ride;
};

const getOtp = (num) => {
  function generateOtp(num) {
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num) - 1;

    const otp = crypto.randomInt(min, max + 1).toString();
    return otp;
  }

  return generateOtp(num);
};

const getFare = async (pickup, destination) => {
  // Check if pickup and destination are provided
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  try {
    // Call mapService to get distance and time data
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // Ensure valid response from the mapping service
    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
      throw new Error(
        "Failed to retrieve valid distance and time data from the mapping service."
      );
    }

    // Validate that the values for distance and duration are positive
    if (distanceTime.distance.value <= 0 || distanceTime.duration.value <= 0) {
      throw new Error(
        "Received invalid distance or duration data from the mapping service."
      );
    }

    // Fare structure for different vehicle types
    const baseFare = {
      auto: 30,
      car: 50,
      moto: 20,
    };

    const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8,
    };

    const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5,
    };

    // Object to store fare calculations for each vehicle type
    const fares = {};

    // Calculate fare for each vehicle type
    for (const vehicleType in baseFare) {
      if (!perKmRate[vehicleType] || !perMinuteRate[vehicleType]) {
        throw new Error(`Invalid vehicle type: ${vehicleType}`);
      }

      const fare = Math.round(
        baseFare[vehicleType] +
          (distanceTime.distance.value / 1000) * perKmRate[vehicleType] +
          (distanceTime.duration.value / 60) * perMinuteRate[vehicleType]
      );
      fares[vehicleType] = fare;
    }

    // Return the calculated fares
    return fares;
  } catch (error) {
    console.error("Error calculating fare:", error);
    throw error; // Rethrow the error so the calling function can handle it
  }
};

module.exports.getFare = getFare;

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    console.error("Missing rideId or captain data");
    throw new Error("Ride ID or Captain data is missing");
  }

  try {
    // Update the ride with the captain's ID and set the status to "accepted"
    const ride = await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: "accepted",
        captain: captain._id,
      },
      { new: true }
    );

    if (!ride) {
      console.error("Ride not found for ID:", rideId);
      throw new Error("Ride not found");
    }

    // Retrieve the updated ride and populate both 'user' and 'captain'
    const populatedRide = await rideModel
      .findOne({ _id: rideId })
      .populate("user", "socketId")
      .populate("captain")
      .select("+otp");

    if (!populatedRide) {
      console.error("Failed to populate the ride");
      throw new Error("Failed to populate the ride");
    }

    return populatedRide;
  } catch (error) {
    console.error("Error in confirmRide:", error.message);
    throw error;
  }
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  console.log("Received parameters: rideId =", rideId, "otp =", otp);

  if (!rideId || !otp) {
    throw new Error("Ride ID and OTP are required");
  }

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user", "socketId")
    .populate("captain", "socketId")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  console.log("Ride found:", ride);

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  try {
    const updatedRide = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { status: "ongoing", captain: captain },
      { new: true }
    );

    console.log("Updated ride:", updatedRide);

    // Log and verify socketId before sending the message
    const userSocketId = ride.user?.socketId;

    console.log("User socketId:", userSocketId);

    if (!userSocketId) {
      console.error("User socketId is missing!");
      return;
    }

    // Send a message to the user's socket
    sendMessageToSocketId(userSocketId, {
      event: "ride-started",
      data: updatedRide,
    });

    return updatedRide;
  } catch (err) {
    console.error("Error while updating ride status", err);
    throw new Error("Failed to update ride status");
  }
};
