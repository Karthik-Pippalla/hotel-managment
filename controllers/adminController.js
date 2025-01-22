const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Admin Dashboard Controller
exports.getDashboard = async (req, res) => {
  try {
    // Calculate start and end of the current day
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Fetch total rooms and available rooms
    const totalRooms = (await Room.countDocuments()) || 0;
    const availableRooms =
      (await Room.countDocuments({ isAvailable: true })) || 0;

    // Fetch bookings made today
    const bookingsToday =
      (await Booking.countDocuments({
        checkIn: { $gte: startOfDay, $lte: endOfDay },
      })) || 0;

    // Calculate total revenue from bookings
    const revenue = await Booking.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
    ]);
    const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

    // Render the dashboard with all required data
    res.render("dashboard", {
      totalRooms,
      availableRooms,
      bookingsToday,
      totalRevenue,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err.message); // Log the error
    res.status(500).send("Error loading dashboard");
  }
};
