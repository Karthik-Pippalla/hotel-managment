const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  tags: [String], // Smoking/Non-smoking, AC/Non-AC, etc.
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("Room", RoomSchema);
