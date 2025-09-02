const express = require('express');
const router = express.Router();
const BookedStall = require('../Collection/StallBooked');

router.post('/book', async function (req, res) {
  try {
    const { visitorId, selectedStalls } = req.body;

    if (!visitorId || !Array.isArray(selectedStalls) || selectedStalls.length === 0) {
      return res.status(400).json({ message: 'Missing visitorId or selectedStalls' });
    }

    // Check if any of the stalls are already booked
    const alreadyBooked = await BookedStall.find({
      stallNo: { $in: selectedStalls },
      status: 'booked'
    });

    if (alreadyBooked.length > 0) {
      const bookedStalls = alreadyBooked.flatMap(doc => doc.stallNo);
      return res.status(400).json({ message: 'Some stalls already booked', bookedStalls });
    }

    // Book all in one document
    const booking = new BookedStall({
      ExhibitorId: visitorId,
      stallNo: selectedStalls,
      status: 'booked'
    });

    await booking.save();

    return res.status(200).json({ message: 'Booking complete', booking });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ message: error.message});
  }
});

// 1) GET /api/stalls/booked
//    → Sabhi booked stall documents ko return karta hai
router.get('/booked', async (req, res) => {
  try {
    // status = 'booked' wale sab records le lo
    const bookings = await BookedStall.find({ status: 'booked' })
      .populate('ExhibitorId', 'name email') // exhibitor ka naam-email bhi populate kar sakte ho
      .sort({ bookingDate: -1 });           // sabse naya booking sabse pehle

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching booked stalls:', error);
    return res.status(500).json({ message: error.message});
  }
});

// 2) GET /api/stalls/booked/:exhibitorId
//    → Sirf us exhibitor ke booked stalls dikhayega
router.get('/booked/:exhibitorId', async (req, res) => {
  try {
    const { exhibitorId } = req.params;

    // Pehle format check kar lo ki valid MongoDB ObjectId hai ya nahi
    if (!exhibitorId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid exhibitorId format' });
    }

    // status = 'booked' aur ExhibitorId = params mein di hui ID
    const bookings = await BookedStall.find({ 
      ExhibitorId: exhibitorId, 
      status: 'booked' 
    })
      .sort({ bookingDate: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching exhibitor bookings:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
