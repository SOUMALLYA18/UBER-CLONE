const rideModel = require("../models/rideModel");
const mapService = require("../services/mapsService");

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination, vehicleType);

 
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    fare: fare,
  });

  return ride;
};

const getFare = async (pickup, destination, vehicleType) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error("Failed to retrieve distance and time data");
  }

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

  if (!baseFare[vehicleType]) {
    throw new Error("Invalid vehicle type");
  }

  const fare = Math.round(
    baseFare[vehicleType] +
      (distanceTime.distance.value / 1000) * perKmRate[vehicleType] +
      (distanceTime.duration.value / 60) * perMinuteRate[vehicleType]
  );

  return fare;
};
