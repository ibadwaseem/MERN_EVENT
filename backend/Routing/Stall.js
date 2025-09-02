const express = require("express");
const router = express.Router();
const stallController = require("../function/Stall"); // adjust path

// Create new stall
router.post("/", stallController.createStall);

// Get all stalls
router.get("/", stallController.getAllStalls);

// Get stall by id
router.get("/:id", stallController.getStallById);

// Update stall by id
router.put("/:id", stallController.updateStall);

// Delete stall by id
router.delete("/:id", stallController.deleteStall);

module.exports = router;
