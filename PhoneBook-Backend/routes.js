const express = require("express");
const router = express.Router();

const controllers = require("./routeControllers.js");

router.get("/", controllers.home);
router.get("/info", controllers.info);

module.exports = router;
