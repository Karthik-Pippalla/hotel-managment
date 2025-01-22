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
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.redirect("/customers");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
