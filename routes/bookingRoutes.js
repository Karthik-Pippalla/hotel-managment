const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Get all bookings
router.get("/", bookingController.getBookings);

// Add a booking
router.post("/add", bookingController.addBooking);

// Delete a booking
router.post("/delete/:id", bookingController.deleteBooking);

module.exports = router;
