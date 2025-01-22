const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  idNumber: { type: String, required: true },
  preferences: {
    roomType: String, // Smoking/Non-smoking, AC/Non-AC, etc.
    bedType: String, // Single/Double/Queen/King
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
