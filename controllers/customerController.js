const Customer = require("../models/Customer");
const Booking = require("../models/Booking");

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
    const { name, phone, address, idType, idNumber, preferences } = req.body;

    // Validate required fields
    if (!name || !phone || !address || !idType || !idNumber || !preferences) {
      return res.status(400).send("All fields are required.");
    }

    const customer = new Customer({
      name,
      phone,
      address,
      idType,
      idNumber,
      preferences,
    });

    await customer.save();
    res.redirect("/customers");
  } catch (err) {
    console.error("Error adding customer:", err.message);
    res.status(500).send("Error adding customer.");
  }
};

// Show edit customer form
exports.editCustomerForm = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send("Customer not found.");
    }
    res.render("editCustomer", { customer });
  } catch (err) {
    console.error("Error fetching customer for editing:", err.message);
    res.status(500).send("Error loading edit form.");
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, phone, address, idType, idNumber, preferences } = req.body;

    if (!name || !phone || !address || !idType || !idNumber || !preferences) {
      return res.status(400).send("All fields are required.");
    }

    await Customer.findByIdAndUpdate(req.params.id, {
      name,
      phone,
      address,
      idType,
      idNumber,
      preferences,
    });

    res.redirect("/customers");
  } catch (err) {
    console.error("Error updating customer:", err.message);
    res.status(500).send("Error updating customer.");
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    // Check for active bookings
    const activeBookings = await Booking.find({ customerId });
    if (activeBookings.length > 0) {
      return res.status(400).json({
        error: "Cannot delete customer with active bookings.",
      });
    }

    await Customer.findByIdAndDelete(customerId);
    res.json({ message: "Customer deleted successfully." });
  } catch (err) {
    console.error("Error deleting customer:", err.message);
    res.status(500).json({ error: "Error deleting customer." });
  }
};

// Search customers
exports.searchCustomers = async (req, res) => {
  try {
    const query = req.query.q || ""; // Search query
    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search
        { phone: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
      ],
    });
    res.json(customers);
  } catch (err) {
    console.error("Error searching customers:", err.message);
    res.status(500).json({ error: "Error searching customers." });
  }
};
