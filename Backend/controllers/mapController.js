const mapService = require("../services/mapsService");
const { validateCoordinates } = require("../utils/validateCoordinates ");
const { validateDistanceTime } = require("../utils/validateDisatnceTime");
const { inputSchema } = require("../utils/schemas/inputSchema");

module.exports.getCoordinates = async (req, res, next) => {
  const { error } = validateCoordinates(req.query);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching coordinates", error: error.message });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const { error } = validateDistanceTime(req.query);
  if (error) {
    return res.status(400).json({ errors: error.details });
  }
  try {
    const { origin, destination } = req.query;

    const distanceTime = await mapService.getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getAutoSuggestions = async (req, res, next) => {
  try {
    const { error } = inputSchema.validate(req.query, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }
    const { input } = req.query;
    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
