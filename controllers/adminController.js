const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Admin Dashboard Controller
exports.getDashboard = async (req, res) => {
  try {
    // Current date and time
    const now = new Date();

    // Calculate timeframes
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    );
    const oneYearAgo = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    );

    // Fetch total rooms and available rooms
    const [totalRooms, availableRooms] = await Promise.all([
      Room.countDocuments() || 0,
      Room.countDocuments({ isAvailable: true }) || 0,
    ]);

    // Fetch bookings made today
    const bookingsToday =
      (await Booking.countDocuments({
        checkIn: { $gte: startOfDay, $lte: endOfDay },
      })) || 0;

    // Helper function for calculating revenue
    const calculateRevenue = async (startDate, endDate) => {
      const revenueData = await Booking.aggregate([
        {
          $match: {
            isCheckedOut: true,
            checkOut: { $gte: startDate, $lte: endDate },
          },
        },
        { $group: { _id: null, total: { $sum: "$price" } } },
      ]);
      return revenueData[0]?.total || 0;
    };

    // Calculate revenue for different timeframes
    const [
      totalRevenue24Hours,
      totalRevenue1Week,
      totalRevenue1Month,
      totalRevenue1Year,
    ] = await Promise.all([
      calculateRevenue(oneDayAgo, new Date()),
      calculateRevenue(oneWeekAgo, new Date()),
      calculateRevenue(oneMonthAgo, new Date()),
      calculateRevenue(oneYearAgo, new Date()),
    ]);

    // Render the dashboard with all required data
    res.render("dashboard", {
      totalRooms,
      availableRooms,
      bookingsToday,
      totalRevenue24Hours,
      totalRevenue1Week,
      totalRevenue1Month,
      totalRevenue1Year,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err.message);
    res.status(500).send("Error loading dashboard");
  }
};
