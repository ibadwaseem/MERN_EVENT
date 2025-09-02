const express = require("express");
const router = express.Router();
const hallController = require("../Function/Halls");

router.post("/", hallController.createHall);
router.get("/", hallController.getAllHalls);
router.get("/:id", hallController.getHallById);
router.put("/:id", hallController.updateHall);
router.delete("/:id", hallController.deleteHall);

module.exports = router;
