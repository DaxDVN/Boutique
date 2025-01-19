# README for E-commerce Web Application

This is an e-commerce web application project that includes both client-side and admin-side components, as well as a backend server. The application allows users to browse products, place orders, manage their accounts, and interact with a live chat feature. Admin users can manage products and orders through an admin dashboard. Below are the details of the project requirements and setup instructions.

Frontend Client: https://boutique-funix.netlify.app

Frontend Server: https://boutique-admin.netlify.app

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Project Setup](#project-setup)
4. [Backend](#backend)
5. [Frontend](#frontend)
6. [Key Features](#key-features)
7. [Technologies Used](#technologies-used)

---

## Project Overview

This project is an e-commerce web application that consists of three main components:

- **Backend Server (Node.js)**: Handles all data-related operations such as managing users, orders, and products through a MongoDB database.
- **Client Application (React.js)**: Provides the frontend for customers to view products, place orders, and interact with the live chat.
- **Admin Application (React.js)**: Allows administrators to manage products, view orders, and handle customer interactions.

The server runs on **Port 5000**, the client on **Port 3000**, and the admin app on **Port 3001**.

---

## System Architecture

- **Frontend**: React.js-based single-page applications (SPA)
  - **Client**: For customers to interact with products and place orders.
  - **Admin**: For administrators to manage products and users.
  
- **Backend**: Node.js (Express.js) RESTful API
  - Handles CRUD operations for products, orders, and users.
  
- **Database**: MongoDB
  - Stores user data, product data, orders, and sessions.

- **Live Chat**: Using Socket.io for real-time customer support communication between customers and consultants.

---

## Project Setup

### Clone the repository

```bash
git clone <repository_url>
cd e-commerce-project
```

### Install dependencies

Install dependencies for both frontend and backend components.

Backend Server

```bash
cd server
npm install
```

Client Application

```bash
cd client
npm install
```

Admin Application

```bash
cd admin
npm install
```

## Backend

1. Run the Backend Server

```bash
cd server
npm start
```

The server will run on port in .env.

2. Environment Variables

Make sure to configure environment variables for MongoDB and email services in a .env file.

```bash
DB_URL=<your_mongo_connection_string>
CLOUD_NAME=<your_cloudinary_name>
CLOUD_API_KEY=<your_cloudinary_api_key>
CLOUD_API_SECRET=<your_cloudinary_api_key_secret>
SECRET_KEY=<your_jwt_secret_key>
SENDGRID_KEY=<your_sendgrid_key>
EMAIL_FROM=<your_email_address>
PORT=<your_port>
```

## Frontend

1. Run the Client Application

```bash
cd client
npm start
```

The client app will run on http://localhost:3000.

2. Run the Admin Application

```bash
cd admin
npm start
```

The admin app will run on http://localhost:3001.

## Key Features

1. User Authentication

- Registration and Login: Passwords are securely hashed using bcrypt. JWT is used for authentication and session management.
- Session: After successful login, a session is set for session persistence.

2. Product Management

- Product Listing: The client app displays a list of products fetched from the backend.
- Product Details: Users can view detailed information about each product.

3. Order Placement

- Users can place orders, which will store the order details in the database.

4. Email Notifications

- Registration and Login: Passwords are securely hashed using bcrypt. JWT is used for authentication and session management.
- Session: After successful login, a session is set for session persistence.

5. Admin Dashboard

- Admin users can manage products, view orders, and monitor transactions.

6. Live Chat

- Socket.io: Real-time chat system for customer support, allowing users and consultants to communicate.
- Consultant and Admin: Can see active chat rooms and respond to user messages.

## Technologies Used

### Frontend:

+ React.js
  - Axios (for API calls)
  - React Router (for routing)
  - Socket.io-client (for live chat)

### Backend:

+ Node.js
  - Express.js
  - MongoDB
  - Mongoose (for MongoDB ORM)
  - bcrypt.js (for password hashing)
  - jsonwebtoken (for JWT authentication)
  - Nodemailer (for email sending)
  - Socket.io (for live chat)
 
###Conclusion

This e-commerce web application is fully functional with features like product management, order placement, live chat, and admin functionalities. It uses a full-stack approach with React.js for the frontend, Node.js for the backend, and MongoDB for the database. The system is designed to be scalable and secure, ensuring a smooth experience for both customers and admins.
