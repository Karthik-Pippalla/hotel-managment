const mongoose = require("mongoose");
const Customer = require("./models/customer"); // Replace with the correct path to your Customer model
require("dotenv").config();
const customers = [
  {
    name: "John Doe",
    phone: "1234567890",
    address: "123 Main Street, New York, NY",
    idNumber: "DL123456789",
    preferences: {
      roomType: "Non-smoking",
      bedType: "King Bed",
    },
  },
  {
    name: "Jane Smith",
    phone: "9876543210",
    address: "456 Elm Street, Los Angeles, CA",
    idNumber: "DL987654321",
    preferences: {
      roomType: "Smoking",
      bedType: "Queen Bed",
    },
  },
  {
    name: "Robert Brown",
    phone: "5556667777",
    address: "789 Oak Avenue, Chicago, IL",
    idNumber: "DL112233445",
    preferences: {
      roomType: "Non-smoking",
      bedType: "Double Bed",
    },
  },
  {
    name: "Emily Davis",
    phone: "4443332222",
    address: "101 Pine Lane, Houston, TX",
    idNumber: "DL998877665",
    preferences: {
      roomType: "AC",
      bedType: "Single Bed",
    },
  },
  {
    name: "Michael Johnson",
    phone: "3332221111",
    address: "202 Birch Street, Phoenix, AZ",
    idNumber: "DL665544332",
    preferences: {
      roomType: "Non-smoking",
      bedType: "Queen Bed",
    },
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
    await Customer.insertMany(customers);
    console.log("Sample customers added");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error:", err));
