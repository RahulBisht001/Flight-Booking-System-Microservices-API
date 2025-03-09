const express = require("express");
const {InfoController} = require("../../controllers");

const router = express.Router();

router.get("/info", InfoController.info);

const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);

module.exports = router;
