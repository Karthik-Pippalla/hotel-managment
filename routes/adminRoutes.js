const express = require("express");
const router = express.Router();
const Room = require("../models/Room"); // Import Room model
const Booking = require("../models/Booking"); // Import Booking model
const adminController = require("../controllers/adminController");
// Dashboard Route
router.get("/dashboard", adminController.getDashboard);

// Admin Dashboard Route
exports.getDashboard = async (req, res) => {
  try {
    // Fetch total number of rooms
    const totalRooms = await Room.countDocuments();

    // Fetch available rooms
    const availableRooms = await Room.countDocuments({ isAvailable: true });

    // Fetch today's bookings
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const bookingsToday = await Booking.countDocuments({
      checkIn: { $gte: startOfDay, $lte: endOfDay },
    });

    // Calculate total revenue
    const revenue = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);
    const totalRevenue = revenue[0]?.totalRevenue || 0;

    // Render the dashboard template with the data
    res.render("dashboard", {
      totalRooms,
      availableRooms,
      bookingsToday,
      totalRevenue,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).send("Error loading dashboard");
  }
};
// Additional Admin Routes can go here
router.get("/manage-customers", (req, res) => {
  res.send("Customer Management Page");
});

router.get("/manage-rooms", (req, res) => {
  res.send("Room Management Page");
});

module.exports = router;
