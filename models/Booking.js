const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  price: { type: Number, required: true },
  isCheckedOut: { type: Boolean, default: false }, // New field
});

module.exports = mongoose.model("Booking", BookingSchema);
