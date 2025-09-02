const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  stall_no: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  hall: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Halls",   // Link to Hall collection
    required: true,
  },
});

module.exports = mongoose.model("Stalls", stallSchema);
