const express = require("express");
const controllers = require("./routeControllers.js");
const router = express.Router();



router.get("/persons", controllers.getPersons)
router.get("/persons/:id", controllers.getPerson)

module.exports = router;