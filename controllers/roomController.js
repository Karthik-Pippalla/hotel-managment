const Room = require("../models/Room");

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.render("rooms", { rooms });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    const room = new Room({
      roomNumber: req.body.roomNumber,
      tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags], // Handle single or multiple selections
      price: req.body.price,
    });
    await room.save();
    res.redirect("/rooms");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.editRoomForm = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    const tags = [
      "Smoking",
      "Non-smoking",
      "AC",
      "Non-AC",
      "King Bed",
      "Queen Bed",
    ]; // Pre-defined tags
    res.render("editRoom", { room, tags });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update room
exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = {
      roomNumber: req.body.roomNumber,
      tags: Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags],
      price: req.body.price,
    };
    await Room.findByIdAndUpdate(req.params.id, updatedRoom);
    res.redirect("/rooms");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;

    // Check if the room has active bookings
    const activeBookings = await Booking.find({ roomId });
    if (activeBookings.length > 0) {
      return res.status(400).json({
        error: "Cannot delete room with active bookings.",
      });
    }

    // Delete the room
    await Room.findByIdAndDelete(roomId);
    res.json({ message: "Room deleted successfully." });
  } catch (err) {
    console.error("Error deleting room:", err.message);
    res.status(500).json({ error: "Error deleting room." });
  }
};
