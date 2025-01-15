const captainModel = require("../models/captainModel");
const captainService = require("../services/captainService");
const { validateCaptain } = require("../utils/captainvalidation");
const { hashPassword, comparePassword } = require("../utils/auth");
const { validateLogin } = require("../utils/validateLogin");
const blacklistToken = require("../models/blacklistToken");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      color,
      plate,
      capacity,
      vehicleType,
    } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ error: "Captain already exists" });
    }
    const fullname = { firstname, lastname };
    const vehicle = { color, plate, capacity, vehicleType };
    const captainData = {
      fullname,
      email,
      password,
      vehicle,
    };

    const { error } = validateCaptain(captainData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const hashedPassword = await hashPassword(password);

    const captain = await captainService.createcaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = validateLogin({ email, password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await comparePassword(password, captain.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, captain });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization.split(" ")[1];
  await blacklistToken.create({ token });
  await res.status(200).json({ message: "Logged out successfully" });
};
