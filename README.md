WTWR — Backend (Express API)
This is the Express.js backend for the WTWR application. It provides RESTful API endpoints for user authentication, clothing item management, and weather‑based outfit recommendations. The service is designed to be lightweight, modular, and easy to extend.

⚠️ Important Note About Load Time
This API is deployed on a free hosting tier that sleeps when inactive.
The first request may take a few seconds to wake the server.  
Once awake, responses are fast and consistent.

🛠️ Tech Stack
Node.js
Express.js
MongoDB
RESTful API architecture
JWT authentication
Hosted on free-tier cloud service

📦 Features
User registration and login
Secure JWT-based authentication
CRUD operations for clothing items
Weather‑driven outfit recommendation endpoints
Input validation and error handling
Modular routing and controller structure

📁 Project Structure
Code
/controllers
/routes
/models
/middlewares
/utils

🔧 Development
Install dependencies:
Code
npm install
Run locally:
Code
npm run start
