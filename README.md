# 🏨 Hotel Management System

Welcome to the **Hotel Management System**! This is a fully-featured web application for managing hotel bookings, customers, rooms, and revenue. Built with Node.js, Express.js, MongoDB, and EJS for templating, this project provides an intuitive dashboard for managing operations efficiently. 🚀

---

## 🌟 Features

- 📋 **Customer Management**: Add, search, and manage customer records seamlessly.
- 🛏️ **Room Management**: Track available rooms and assign tags for specific facilities.
- 🕒 **Booking Management**: Make new bookings, handle cancellations, and manage checkouts.
- 📊 **Revenue Insights**: Real-time revenue tracking for the last 24 hours, week, month, and year.
- 🎨 **Interactive Dashboard**: A visually appealing and responsive dashboard to oversee operations.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: EJS templates, CSS, JavaScript
- **Dependencies**:
  - `mongoose` - MongoDB object modeling
  - `express` - Web framework
  - `ejs` - Template engine

---

## 🎯 Getting Started

Follow these instructions to get the project up and running on your local machine.

### 🚨 Prerequisites

Ensure you have the following installed:
- 🐙 [Node.js](https://nodejs.org/)
- 🐬 [MongoDB](https://www.mongodb.com/try/download/community)

### 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hotel-management-system.git
   cd hotel-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the root directory and add:
     ```
     MONGO_URI=mongodb://localhost:27017/hotel
     PORT=5000
     ```

4. Seed the database:
   ```bash
   node seed.js
   ```

5. Run the application:
   ```bash
   npm start
   ```



## 🖥️ Screenshots

### 📊 Dashboard
![Dashboard]([image](https://github.com/user-attachments/assets/07963463-b68d-40c7-8d43-21e8da6604b0)
)

### 🛏️ Manage Rooms
![Manage Rooms](![image](https://github.com/user-attachments/assets/59b66f4d-5d93-42bb-b72d-b53aea23d29d)
)

### 📋 Manage Bookings
![Manage Bookings](![image](https://github.com/user-attachments/assets/3ad75c68-d4b9-4428-8942-eaf35e57e0cf)
)

---

## 📂 Project Structure

```
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── searchCustomer.js
├── views/
│   ├── dashboard.ejs
│   ├── bookings.ejs
│   ├── rooms.ejs
│   ├── customers.ejs
│   └── partials/
│       ├── header.ejs
│       ├── footer.ejs
├── models/
│   ├── Booking.js
│   ├── Customer.js
│   ├── Room.js
├── routes/
│   ├── dashboard.js
│   ├── bookings.js
│   ├── rooms.js
│   ├── customers.js
├── controllers/
│   ├── dashboardController.js
│   ├── bookingController.js
│   ├── roomController.js
│   ├── customerController.js
├── seed.js
├── app.js
└── README.md
```

---

## 🧑‍💻 APIs

### 📋 Customer Endpoints
- **GET** `/customers` - Get all customers.
- **POST** `/customers/add` - Add a new customer.
- **GET** `/customers/search?q=name` - Search for a customer.

### 🛏️ Room Endpoints
- **GET** `/rooms` - Get all rooms.
- **POST** `/rooms/add` - Add a new room.

### 🕒 Booking Endpoints
- **GET** `/bookings` - Get all bookings.
- **POST** `/bookings/add` - Add a new booking.
- **POST** `/bookings/delete/:id` - Cancel a booking.
- **POST** `/bookings/checkout/:id` - Mark a booking as checked out.

---

## 🌟 Future Enhancements

- 📱 Mobile-friendly UI
- 🛡️ Role-based authentication
- 📧 Email notifications for booking confirmation
- 📅 Calendar view for room availability

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue. 🙌

---

## 📜 License

This project is licensed under the MIT License. 📄

---

## ❤️ Acknowledgments

Special thanks to everyone who contributed and supported this project. 💖
