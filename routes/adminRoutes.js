const express = require("express");
const router = express.Router();
const Room = require("../models/Room"); // Import Room model
const Booking = require("../models/Booking"); // Import Booking model

// Admin Dashboard Route
router.get("/dashboard", async (req, res) => {
  try {
    // Fetch total number of rooms
    const totalRooms = await Room.countDocuments();

    // Fetch number of available rooms
    const availableRooms = await Room.countDocuments({ isAvailable: true });

    // Fetch number of bookings today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Start of the day
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999); // End of the day
    const bookingsToday = await Booking.countDocuments({
      checkIn: { $gte: todayStart, $lte: todayEnd },
    });

    // Render the dashboard view with fetched data
    res.render("dashboard", {
      totalRooms,
      availableRooms,
      bookingsToday,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).send("Error fetching dashboard data");
  }
});

// Additional Admin Routes can go here
router.get("/manage-customers", (req, res) => {
  res.send("Customer Management Page");
});

router.get("/manage-rooms", (req, res) => {
  res.send("Room Management Page");
});

module.exports = router;
