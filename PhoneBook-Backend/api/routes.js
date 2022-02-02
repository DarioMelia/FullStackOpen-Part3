const express = require("express");
const controllers = require("./routeControllers.js");
const router = express.Router();



router.get("/persons", controllers.getPersons)
router.get("/persons/:id", controllers.getPerson)
router.delete("/persons/:id", controllers.deletePersons)

module.exports = router;