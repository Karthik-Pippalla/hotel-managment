const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// Get all customers
router.get("/", customerController.getCustomers);

// Add a customer
router.post("/add", customerController.addCustomer);

// Edit a customer
router.get("/edit/:id", customerController.editCustomerForm);
router.post("/edit/:id", customerController.updateCustomer);

// Delete a customer
router.post("/delete/:id", customerController.deleteCustomer);

module.exports = router;

// Route for searching customers
router.get("/search", customerController.searchCustomers);

module.exports = router;
