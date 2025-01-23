const Customer = require("../models/Customer");

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find(); // Fetch all customers
    res.render("customers", { customers }); // Render the 'customers.ejs' template
  } catch (err) {
    console.error("Error fetching customers:", err.message); // Log the actual error for debugging
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later." });
  }
};

// Add a new customer
exports.addCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.redirect("/customers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Show edit customer form
exports.editCustomerForm = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.render("editCustomer", { customer });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/customers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete customer
const Booking = require("../models/Booking");

exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    // Check if the customer has active bookings
    const activeBookings = await Booking.find({ customerId });
    if (activeBookings.length > 0) {
      return res.status(400).json({
        error: "Cannot delete customer with active bookings.",
      });
    }

    // Delete the customer
    await Customer.findByIdAndDelete(customerId);
    res.json({ message: "Customer deleted successfully." });
  } catch (err) {
    console.error("Error deleting customer:", err.message);
    res.status(500).json({ error: "Error deleting customer." });
  }
};

// Search Customers Controller
exports.searchCustomers = async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request
    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive name search
        { phone: { $regex: query, $options: "i" } }, // Case-insensitive phone search
      ],
    });

    res.json(customers); // Respond with the matching customers
  } catch (err) {
    console.error("Error searching customers:", err.message); // Log the error
    res.status(500).json({ error: "Error searching customers." });
  }
};
