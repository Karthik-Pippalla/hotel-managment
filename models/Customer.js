const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  idType: { type: String, required: true }, // e.g., Passport, Driver's License
  idNumber: { type: String, required: true }, // The actual ID number
  preferences: {
    roomType: { type: String, enum: ["AC", "Non-AC"], required: true },
    bedType: {
      type: String,
      enum: ["King Bed", "Queen Bed", "Double Bed"],
      required: true,
    },
    smoking: { type: String, enum: ["Smoking", "Non-smoking"], required: true },
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
