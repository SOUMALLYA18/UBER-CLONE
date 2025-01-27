const express = require("express");
const router = express.Router();
const {
  createRide,
  startRide,
  endRide,
} = require("../controllers/rideController");
const { authUser, authCaptain } = require("../middlewares/authMiddleware");
const { getFare, confirmRide } = require("../controllers/rideController");

router.post("/create", authUser, createRide);
router.get("/get-fare", authUser, getFare);
router.post("/confirm-ride", authCaptain, confirmRide);
router.get("/start-ride", authCaptain, startRide);
router.post("/end-ride", authCaptain, endRide);
module.exports = router;
