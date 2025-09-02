const mongoose = require('mongoose');

const bookedStallSchema = new mongoose.Schema({
  ExhibitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'exhibitor',
    required: true,
  },
  stallNo: {
    type: [String], // ✅ Now it's an array of strings
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'booked',
  }
});

module.exports = mongoose.model('BookedStall', bookedStallSchema);
