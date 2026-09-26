# WTWR: Weather-Based Wardrobe Recommender — Backend

A Node.js/Express REST API that powers the WTWR application with user authentication, wardrobe management, and automatic default item population.

## Demo
Watch the full walkthrough here:  
https://drive.google.com/file/d/1t3nKE09WM2USEuP8KLYoDGpm5oVzsi8M/view?usp=sharing

## Overview
This backend provides all server-side functionality for WTWR, including:

- User authentication  
- Clothing item CRUD operations  
- Automatic default wardrobe population on signup  
- Secure environment variable handling  
- MongoDB data persistence  
- Production deployment on Render  

## Features
- RESTful API built with Express  
- MongoDB database with Mongoose models  
- JWT authentication  
- Default clothing item insertion for new users  
- Robust error handling  
- CORS restricted to the frontend origins  
- Rate limiting on sign-in/sign-up and security headers via helmet  
- Environment variable support via `.env`

## Tech Stack
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- dotenv  
- Render Deployment  
- JWT Authentication

## Live Deployment
Backend (Render):  
https://se-project-express-vfq4.onrender.com

Frontend (Vercel):  
https://se-project-react-blue.vercel.app/

## Project Structure
```
controllers/
models/
routes/
middlewares/
utils/
app.js
```

## Installation & Setup
1. Clone the repo
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file
   ```
   PORT=3001
   MONGODB_URI=<your MongoDB connection string>
   JWT_SECRET=<a long random string>
   ALLOWED_ORIGINS=http://localhost:3000   # optional; comma-separated frontend URLs allowed by CORS
   NODE_ENV=production   # production only; the server refuses to start without JWT_SECRET
   ```
4. Start the server
   ```
   npm run start   # or: npm run dev (auto-reload)
   ```

## API Endpoints

### Auth
- POST /signup — Create user + insert default items  
- POST /signin — Login and receive JWT  

### Users (auth required)
- GET /users/me — Get the current user
- PATCH /users/me — Update name and avatar

### Clothing Items
- GET /items — Get all items
- POST /items — Add item (auth required)
- DELETE /items/:itemId — Delete your own item (auth required)
- PUT /items/:itemId/likes — Like item (auth required)
- DELETE /items/:itemId/likes — Unlike item (auth required)

## Frontend Repository
https://github.com/xfactor107/se_project_react

## Author
Developed by **Alejandro Jimenez**
