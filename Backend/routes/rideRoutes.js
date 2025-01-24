const express = require("express");
const router = express.Router();
const { createRide } = require("../controllers/rideController");
const { authUser, authCaptain } = require("../middlewares/authMiddleware");
const { getFare, confirmRide } = require("../controllers/rideController");

router.post("/create", authUser, createRide);
router.get("/get-fare", authUser, getFare);
router.post("/confirm-ride", authCaptain, confirmRide);
module.exports = router;
