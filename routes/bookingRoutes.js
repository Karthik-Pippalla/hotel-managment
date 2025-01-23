const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Get all bookings
router.get("/", bookingController.getBookings);

// Add a booking
router.post("/add", bookingController.addBooking);

// Delete a booking
router.post("/delete/:id", bookingController.cancelBooking);

// Checkout a booking
router.post("/checkout/:id", bookingController.checkoutBooking);
// Get all checked-out bookings
router.get("/checked-out", bookingController.getCheckedOutBookings);

module.exports = router;
