const express = require("express");
const router = express.Router();
const {
  getCoordinates,
  getAutoSuggestions,
} = require("../controllers/mapController");
const { getDistanceTime } = require("../controllers/mapController");

const { validateMiddleware } = require("../middlewares/validateMiddleware ");
const {
  getDistanceTimeSchema,
} = require("../utils/schemas/getDistanceTimeSchemas.js");
const {
  getCoordinatesSchema,
} = require("../utils/schemas/getCoordinatesSChema.js.js");
const { inputSchema } = require("../utils/schemas/inputSchema.js");

router.get(
  "/get-coordinates",
  validateMiddleware(getCoordinatesSchema),
  getCoordinates
);

router.get(
  "/get-distance-time",
  validateMiddleware(getDistanceTimeSchema),
  getDistanceTime
);

router.get(
  "/get-suggestions",
  validateMiddleware(inputSchema),
  getAutoSuggestions
);

module.exports = router;
