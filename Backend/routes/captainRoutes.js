const express = require("express");
const router = express.Router();
const { authCaptain } = require("../middlewares/authMiddleware");
const {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} = require("../controllers/captaincontroller");

router.post("/register", registerCaptain);
router.post("/login", loginCaptain);
router.get("/profile", authCaptain, getCaptainProfile);
router.get("/logout", authCaptain, logoutCaptain);
module.exports = router;
