const userModel = require("../models/userModel");
const { validateUser } = require("../utils/valiadation");
const { hashPassword } = require("../utils/auth");

const userService = require("../services/userService");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, password, email } = req.body;

    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
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
