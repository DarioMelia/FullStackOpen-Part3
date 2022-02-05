const express = require("express");
const controllers = require("./routeControllers.js");
const router = express.Router();



router.get("/persons", controllers.getPersons)
router.post("/persons", controllers.addPerson)
router.get("/persons/:id", controllers.getPerson)
router.delete("/persons/:id", controllers.deletePersons)
router.put("/persons/:id", controllers.updatePerson)


module.exports = router;