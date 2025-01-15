const captainModel = require("../models/captainModel");

module.exports.createcaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  try {
    const captain = new captainModel({
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: { color, plate, capacity, vehicleType },
    });
    await captain.save();
    return captain;
  } catch (error) {
    throw new Error(error.message || "Error creating user");
  }
};