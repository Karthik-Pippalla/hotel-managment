const mongoose = require("mongoose");
const Booking = require("./models/Booking");
const Customer = require("./models/customer");
const Room = require("./models/Room");

require("dotenv").config();

const seedBookings = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Fetch customers and rooms
    const customers = await Customer.find(); // Fetch all customers
    const rooms = await Room.find({ isAvailable: true }); // Fetch available rooms

    // Debug logs
    console.log("Customers:", customers);
    console.log("Rooms:", rooms);

    // Validation: Ensure data exists
    if (customers.length === 0) {
      throw new Error(
        "No customers found in the database. Please seed customers first."
      );
    }

    if (rooms.length === 0) {
      throw new Error(
        "No available rooms found in the database. Please seed rooms first."
      );
    }

    // Prepare sample bookings
    const bookings = [
      {
        customerId: customers[0]._id,
        roomId: rooms[0]._id,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days later
        price: rooms[0].price * 2, // 2 days price
        paymentStatus: "Paid",
      },
      {
        customerId: customers[1]._id,
        roomId: rooms[1]._id,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
        price: rooms[1].price * 3, // 3 days price
        paymentStatus: "Pending",
      },
    ];

    // Insert bookings into the database
    await Booking.insertMany(bookings);
    console.log("Sample bookings added");

    // Mark rooms as unavailable
    for (const booking of bookings) {
      await Room.findByIdAndUpdate(booking.roomId, { isAvailable: false });
    }
    console.log("Rooms marked as unavailable");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err.message);
    mongoose.connection.close();
  }
};

// Run the seed function
seedBookings();
