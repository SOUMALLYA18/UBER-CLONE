const userModel = require("../models/userModel");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    return user;
  } catch (error) {
    throw new Error(error.message || "Error creating user");
  }
};
