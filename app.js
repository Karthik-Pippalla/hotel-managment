require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use("/rooms", require("./routes/roomRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/customers", require("./routes/customerRoutes"));
app.use("/rooms", require("./routes/roomRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

// Redirect `/` to `/admin/dashboard`
app.get("/", (req, res) => {
  res.redirect("/admin/dashboard");
});

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res
    .status(500)
    .json({ error: "Something went wrong, please try again later." });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
