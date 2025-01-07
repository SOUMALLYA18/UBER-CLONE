const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/userController");
const { authUser } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getUserProfile);
router.get("/logout", authUser, logoutUser);
module.exports = router;
