const mongoose = require("mongoose");
const Room = require("./models/Room"); // Path to your Room model
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");

    await Room.insertMany([
      {
        roomNumber: "101",
        tags: ["Non-smoking", "AC"],
        price: 100,
        isAvailable: true,
      },
      {
        roomNumber: "102",
        tags: ["Smoking", "Non-AC"],
        price: 80,
        isAvailable: true,
      },
      {
        roomNumber: "103",
        tags: ["Non-smoking", "AC", "King Bed"],
        price: 150,
        isAvailable: false,
      },
    ]);

    console.log("Sample rooms added");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error:", err));
