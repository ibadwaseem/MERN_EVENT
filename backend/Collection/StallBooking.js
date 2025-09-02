import mongoose from 'mongoose';

const StallBookingSchema = new mongoose.Schema({
  exhibitorEmail: {
    type: String,
    required: true,
  },
  selectedStalls: {
    type: [String],
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('StallBooking', StallBookingSchema);
