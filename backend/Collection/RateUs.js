// routes/rating.js
const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  email: String,
  stars: Number,
  date: { type: Date, default: Date.now }
});

const Rating = mongoose.model("Rating", RatingSchema);

router.post("/", async (req, res) => {
  const { email, stars } = req.body;

  if (!email || !stars) {
    return res.status(400).json({ error: "Email and stars are required" });
  }

  try {
    const newRating = new Rating({ email, stars });
    await newRating.save();
    res.json({ message: "Rating submitted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
