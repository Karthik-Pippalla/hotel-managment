const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Room = require("../models/Room");

// Get all bookings
// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId")
      .populate("roomId");
    const customers = await Customer.find();
    const rooms = await Room.find({ isAvailable: true }); // Fetch only available rooms
    console.log("Rooms:", rooms); // Debug log to check fetched room data
    res.render("bookings", { bookings, customers, rooms });
  } catch (err) {
    console.error("Error fetching data:", err.message); // Debugging error log
    res
      .status(500)
      .json({ error: "Something went wrong while fetching bookings." });
  }
};
// Add a new booking
exports.addBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    await Room.findByIdAndUpdate(req.body.roomId, { isAvailable: false });
    res.redirect("/bookings");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    await Room.findByIdAndUpdate(booking.roomId, { isAvailable: true });
    await Booking.findByIdAndDelete(req.params.id);
    res.redirect("/bookings");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
