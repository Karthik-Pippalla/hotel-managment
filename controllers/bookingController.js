const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Room = require("../models/Room");

// Get all bookings
// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    // Fetch all bookings and populate customerId and roomId
    const bookings = await Booking.find()
      .populate("customerId")
      .populate("roomId");

    // Filter out bookings with missing customerId or roomId
    const validBookings = bookings.filter(
      (booking) => booking.customerId && booking.roomId
    );

    // Fetch all customers
    const customers = await Customer.find();

    // Fetch only available rooms
    const rooms = await Room.find({ isAvailable: true });

    // Debug logs for troubleshooting
    console.log("Rooms:", rooms);
    console.log("Valid Bookings:", validBookings);

    // Render the bookings page with valid bookings, customers, and rooms
    res.render("bookings", {
      bookings: validBookings,
      customers,
      rooms,
    });
  } catch (err) {
    console.error("Error fetching data:", err.message); // Log the actual error
    res
      .status(500)
      .json({ error: "Something went wrong while fetching bookings." });
  }
};
// Add a new booking

exports.addBooking = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the form data

    const { customerId, roomId, checkIn, checkOut, price } = req.body;

    // Validate fields
    if (!customerId || !roomId || !checkIn || !checkOut || !price) {
      return res.status(400).send("All fields are required.");
    }

    // Create the booking
    const newBooking = new Booking({
      customerId,
      roomId,
      checkIn,
      checkOut,
      price,
    });

    await newBooking.save();
    res.redirect("/bookings"); // Redirect to bookings page
  } catch (err) {
    console.error("Error adding booking:", err.message);
    res.status(500).send("Error adding booking.");
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
