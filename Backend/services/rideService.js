const rideModel = require("../models/rideModel");
const mapService = require("../services/mapsService");
const crypto = require("crypto");

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
    otp: getOtp(4),
    fare: fare,
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

  const fares = {};

  for (const vehicleType in baseFare) {
    const fare = Math.round(
      baseFare[vehicleType] +
        (distanceTime.distance.value / 1000) * perKmRate[vehicleType] +
        (distanceTime.duration.value / 60) * perMinuteRate[vehicleType]
    );
    fares[vehicleType] = fare;
  }

  return fares;
};

module.exports.getFare = getFare;

module.exports.getFare = getFare;
