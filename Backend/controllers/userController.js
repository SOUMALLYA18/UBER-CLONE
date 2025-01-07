const userModel = require("../models/userModel");
const { validateUser } = require("../utils/valiadation");
const { hashPassword, comparePassword } = require("../utils/auth");
const { validateLogin } = require("../utils/validateLogin");
const userService = require("../services/userService");
const blacklistToken = require("../models/blacklistToken");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, password, email } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }
    const fullname = { firstname, lastname };
    const { error } = validateUser({
      fullname,
      email,
      password,
    });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const hashedPassword = await hashPassword(password);

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = validateLogin({ email, password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    next(error);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies?.token || req.headers.authorization.split(" ")[1];
  await blacklistToken.create({ token });
  await res.status(200).json({ message: "Logged out successfully" });
};
