document.getElementById("search-btn").addEventListener("click", searchCustomer);

async function searchCustomer() {
  const query = document.getElementById("customer-search").value.trim();

  if (!query) {
    alert("Please enter a valid search query.");
    return;
  }

  try {
    const response = await fetch(
      `/customers/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch customers.");
    }

    const customers = await response.json();

    const dropdown = document.getElementById("customer-dropdown");
    dropdown.innerHTML = '<option value="">Select Customer</option>';

    customers.forEach((customer) => {
      const option = document.createElement("option");
      option.value = customer._id;
      option.textContent = `${customer.name} (${customer.phone})`;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error searching customers:", error);
    alert("An error occurred while searching for customers.");
  }
}
