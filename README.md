# 🏨 Hotel Management Admin Dashboard

## 📌 Overview

The **Hotel Management Admin Dashboard** is a powerful tool designed to streamline hotel operations, from managing rooms and bookings to tracking revenue and customer details. This platform integrates **Google Cloud Vision** for automated form filling and leverages **MongoDB** for efficient data storage.

## ✨ Features

✅ **Room Management**: Add, update, and delete rooms with ease.  
✅ **Customer Management**: Store and manage guest details efficiently.  
✅ **Bookings Management**: Handle reservations, check-ins, and check-outs.  
✅ **Google Cloud Vision API**: Extract customer data from driver's licenses using OCR (Optical Character Recognition).  
✅ **Automated Form Filling**: Reduce manual entry with AI-powered document scanning.  
✅ **Revenue Tracking**: Real-time financial insights into hotel earnings.  
✅ **Pagination & Optimization**: Handle large-scale data efficiently with optimized queries.  
✅ **Secure Authentication**: Firebase authentication for user access control.  
✅ **Analytics & Trends**: Visualize booking trends and occupancy rates.  
✅ **Hosted on Firebase**: Easily scalable serverless deployment.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS (Embedded JavaScript Templates)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Cloud Services**: Google Cloud Vision API (OCR), Firebase Hosting & Functions
- **Security**: Helmet.js, CORS, Authentication Middleware
- **Deployment**: Firebase Cloud Functions, Firebase Hosting

---

## 📂 Project Structure

```
hotel-management-dashboard/
├── functions/
│   ├── controllers/         # Business logic for rooms, bookings, customers
│   ├── models/              # Mongoose schemas for data modeling
│   ├── routes/              # API routes for various functionalities
│   ├── views/               # EJS templates for rendering HTML
│   ├── config/              # Database & environment configurations
│   ├── public/              # Static assets like CSS, JS, images
│   ├── index.js             # Main entry point for Firebase Functions
│   ├── db.js                # MongoDB connection setup
│   ├── firebase.json        # Firebase configuration
│   ├── package.json         # Dependencies and scripts
│   ├── .env                 # Environment variables (DO NOT SHARE)
│   ├── .gitignore           # Ignored files for Git
│   ├── README.md            # Project documentation
└── ...
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/hotel-management-dashboard.git
cd hotel-management-dashboard
```

### 2️⃣ Install Dependencies
Navigate to the **functions** directory:
```bash
cd functions
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file inside `functions/` with the following:
```
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/hotel_db
GOOGLE_APPLICATION_CREDENTIALS=./path-to-your-service-account.json
```

### 4️⃣ Run the Server Locally
```bash
npm start
```
Access the app at `http://localhost:5000/admin/dashboard`

---

## 🌎 Deploying to Firebase

### 🔹 Login & Initialize Firebase
```bash
firebase login
firebase init
```
- **Select Firebase Functions**: To handle backend logic.
- **Select Firebase Hosting**: To deploy frontend assets.

### 🔹 Deploy the Project
```bash
firebase deploy
```
- Once deployed, access your app at:
  ```
  https://your-firebase-project.web.app
  ```

---

## 📊 Analytics & Trends
- **Real-time Revenue Tracking**: Monitor last 24 hours, weekly, monthly, and yearly revenue.
- **Booking Trends**: Identify peak booking periods.
- **Occupancy Rate**: Track room utilization.
- **Customer Demographics**: View customer preferences and booking history.

---

## 🔐 Security & Authentication
- **User Authentication**: Secure login using Firebase Authentication.
- **Role-Based Access Control (RBAC)**: Grant different privileges to admin and staff.
- **CORS & Helmet.js**: Prevent security vulnerabilities.

---

## 🔄 Future Enhancements
🔹 **AI Chatbot for Guest Support**  
🔹 **Automated Invoice Generation**  
🔹 **SMS & Email Notifications for Bookings**  
🔹 **Integration with Payment Gateways (Stripe, PayPal, etc.)**  
🔹 **Loyalty Program for Frequent Guests**  



---



💡 *"Efficiency is doing better what is already being done."* - Peter Drucker  
🎯 **Built with ❤️ for seamless hotel management.**  

for full advance code like ocr, computer vision, nlp , automated form filling.... email me
extra security to not to spam my work.
