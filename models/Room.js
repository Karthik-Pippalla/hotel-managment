const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  smoking: {
    type: String,
    required: true,
    enum: ["Smoking", "Non-smoking"],
  },
  ac: {
    type: String,
    required: true,
    enum: ["AC", "Non-AC"],
  },
  bed: {
    type: String,
    required: true,
    enum: ["King Bed", "Queen Bed", "Double Bed"],
  },
  price: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
