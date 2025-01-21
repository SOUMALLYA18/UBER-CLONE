const express = require("express");
const router = express.Router();
const { createRide } = require("../controllers/rideController");
const { authUser } = require("../middlewares/authMiddleware");
const { getFare } = require("../controllers/rideController");
router.post("/create", authUser, createRide);
router.get("/get-fare", authUser, getFare);

module.exports = router;
