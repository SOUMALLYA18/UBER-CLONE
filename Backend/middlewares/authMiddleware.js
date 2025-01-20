const userModel = require("../models/userModel");
const captainModel = require("../models/captainModel");
const jwt = require("jsonwebtoken");
const blacklistToken = require("../models/blacklistToken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const isBlacklisted = await blacklistToken.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const isBlacklisted = await blacklistToken.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;

    if (!captain) {
      return res.status(401).json({ error: "Unauthorized: Captain not found" });
    }

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
