const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Admin Dashboard Controller
exports.getDashboard = async (req, res) => {
  try {
    // Fetch available rooms
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ isAvailable: true });

    // Calculate revenue (sum of booking prices)
    const revenue = await Booking.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
    ]);
    const totalRevenue = revenue[0]?.totalRevenue || 0;

    // Render dashboard with data
    res.render("dashboard", {
      totalRooms,
      availableRooms,
      totalRevenue,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err.message);
    res.status(500).send("Error loading dashboard");
  }
};
