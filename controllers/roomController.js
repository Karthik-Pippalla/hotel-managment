const Room = require("../models/Room");
const Booking = require("../models/Booking");

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.render("rooms", { rooms });
  } catch (err) {
    console.error("Error fetching rooms:", err.message);
    res.status(500).send("Error fetching rooms.");
  }
};

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    // Log the request body for debugging
    console.log("Request Body:", req.body);

    // Parse the tags directly from the request body
    const { smoking, ac, bed } = req.body;

    // Validate required fields
    if (!smoking || !ac || !bed) {
      throw new Error("All tag fields (smoking, AC, bed) are required.");
    }

    // Create a new Room instance
    const room = new Room({
      roomNumber: req.body.roomNumber,
      smoking, // Smoking preference
      ac, // AC preference
      bed, // Bed type
      price: req.body.price,
    });

    // Save the room to the database
    await room.save();
    res.redirect("/rooms");
  } catch (err) {
    console.error("Error adding room:", err.message);
    res.status(400).send(err.message);
  }
};

// Render edit room form
exports.editRoomForm = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).send("Room not found.");
    }

    res.render("editRoom", { room });
  } catch (err) {
    console.error("Error loading room for editing:", err.message);
    res.status(500).send("Error loading room for editing.");
  }
};

exports.updateRoom = async (req, res) => {
  try {
    // Extract fields from the request body
    const { smoking, ac, bed, roomNumber, price } = req.body;

    // Validate required fields
    if (!smoking || !ac || !bed) {
      throw new Error("All tag fields (smoking, AC, bed) are required.");
    }

    // Prepare the updated room data
    const updatedRoom = {
      roomNumber,
      smoking,
      ac,
      bed,
      price,
    };

    const room = await Room.findByIdAndUpdate(req.params.id, updatedRoom, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).send("Room not found.");
    }

    res.redirect("/rooms");
  } catch (err) {
    console.error("Error updating room:", err.message);
    res.status(400).send(err.message);
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;

    // Check if the room has active bookings
    const activeBookings = await Booking.find({
      roomId,
      isCheckedOut: false,
    });

    if (activeBookings.length > 0) {
      return res.status(400).json({
        error:
          "Cannot delete room with active bookings. Mark bookings as checked out first.",
      });
    }

    // Delete the room
    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      return res.status(404).json({ error: "Room not found." });
    }

    res.json({ message: "Room deleted successfully." });
  } catch (err) {
    console.error("Error deleting room:", err.message);
    res.status(500).json({ error: "Error deleting room." });
  }
};

exports.getCheckedOutBookings = async (req, res) => {
  try {
    // Fetch all checked-out bookings and populate customerId and roomId
    const bookings = await Booking.find({ isCheckedOut: true })
      .populate("customerId")
      .populate("roomId");

    // Filter out any bookings with missing roomId or customerId
    const validBookings = bookings.filter(
      (booking) => booking.customerId && booking.roomId
    );

    res.render("checkedOutBookings", { bookings: validBookings });
  } catch (err) {
    console.error("Error fetching checked-out bookings:", err.message);
    res.status(500).send("Error loading checked-out bookings.");
  }
};
