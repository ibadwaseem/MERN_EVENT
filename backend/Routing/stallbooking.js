import express from 'express';
import StallBooking from '../Collection/StallBooking.js';
import { verifyExhibitor } from '../Function/Logic.js';

const router = express.Router();

// POST route to save stall bookings
router.post('/book', verifyExhibitor, async (req, res) => {
  const { email, selectedStalls } = req.body;

  try {
    const booking = new StallBooking({ exhibitorEmail: email, selectedStalls });
    await booking.save();
    res.status(200).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error });
  }
});

export default router;
