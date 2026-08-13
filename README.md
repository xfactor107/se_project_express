# WTWR: Weather-Based Wardrobe Recommender — Backend

A Node.js/Express REST API that powers the WTWR application with user authentication, wardrobe management, weather-based filtering, and automatic default item population.

## Demo
Watch the full walkthrough here:  
https://drive.google.com/file/d/1t3nKE09WM2USEuP8KLYoDGpm5oVzsi8M/view?usp=sharing

## Overview
This backend provides all server-side functionality for WTWR, including:

- User authentication  
- Clothing item CRUD operations  
- Weather-based filtering logic  
- Automatic default wardrobe population on signup  
- Secure environment variable handling  
- MongoDB data persistence  
- Production deployment on Render  

## Features
- RESTful API built with Express  
- MongoDB database with Mongoose models  
- JWT authentication  
- Default clothing item insertion for new users  
- Weather-based filtering  
- Robust error handling  
- CORS configuration  
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
controllers/
models/
routes/
middlewares/
utils/
app.js


## Installation & Setup
1. Clone the repo  
2. Install dependencies  
npm install

3. Create a `.env` file  
PORT=3001
MONGO_URL=<your MongoDB connection string>
JWT_SECRET=<your secret>

4. Start the server  
npm run start


## API Endpoints

### Auth
- POST /signup — Create user + insert default items  
- POST /signin — Login and receive JWT  

### Clothing Items
- GET /items — Get all items  
- POST /items — Add item  
- DELETE /items/:id — Delete item  
- PUT /items/:id/likes — Like item  
- DELETE /items/:id/likes — Unlike item  

## Author
Developed by **Alejandro Jimenez**
