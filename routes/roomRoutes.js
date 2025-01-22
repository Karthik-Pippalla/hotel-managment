const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Get all rooms
router.get("/", roomController.getRooms);

// Add a room
router.post("/add", roomController.addRoom);

// Edit a room
router.get("/edit/:id", roomController.editRoomForm);
router.post("/edit/:id", roomController.updateRoom);

// Delete a room
router.post("/delete/:id", roomController.deleteRoom);

module.exports = router;
