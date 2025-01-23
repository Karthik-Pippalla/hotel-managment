const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Room = require("../models/Room");

// Get all bookings
// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    // Fetch all bookings, populate customerId and roomId, and exclude checked-out bookings
    const bookings = await Booking.find({ isCheckedOut: { $ne: true } })
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
    console.log("Available Rooms:", rooms);
    console.log("Valid Bookings:", validBookings);

    // Render the bookings page with valid bookings, customers, and rooms
    res.render("bookings", {
      bookings: validBookings,
      customers,
      rooms,
    });
  } catch (err) {
    console.error("Error fetching bookings data:", err.message); // Log the actual error
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

// Cancel Booking (Deletes from DB)
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the booking
    await Booking.findByIdAndDelete(id);

    // Redirect back to bookings page
    res.redirect("/bookings");
  } catch (err) {
    console.error("Error cancelling booking:", err.message);
    res.status(500).send("Error cancelling booking.");
  }
};

exports.getCheckedOutBookings = async (req, res) => {
  try {
    const checkedOutBookings = await Booking.find({ isCheckedOut: true })
      .populate("customerId")
      .populate("roomId");
    res.render("checkedOutBookings", { checkedOutBookings });
  } catch (err) {
    console.error("Error fetching checked-out bookings:", err.message);
    res.status(500).send("Error fetching checked-out bookings.");
  }
};

// Checkout Booking (Marks as Checked-Out)
exports.checkoutBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Update the booking status to checked out
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).send("Booking not found.");
    }

    booking.isCheckedOut = true; // Mark as checked out
    await booking.save();

    // Add revenue to the room or total revenue calculation logic
    // Assuming you have a totalRevenue or dailyRevenue model
    // For simplicity, you can sum it up in-memory here
    console.log(`Revenue from room ${booking.roomId}: $${booking.price}`);

    // Redirect back to bookings page
    res.redirect("/bookings");
  } catch (err) {
    console.error("Error checking out booking:", err.message);
    res.status(500).send("Error checking out booking.");
  }
};
