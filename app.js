require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const { errors } = require("celebrate");
const { createUser, login } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { ALLOWED_ORIGINS } = require("./utils/config");

const app = express();
const { PORT = 3001 } = process.env;
const { MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Render sits behind a proxy; trust it so rate limiting sees real client IPs.
app.set("trust proxy", 1);

// Slow down password guessing and signup spam.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again in 15 minutes." },
});

app.use(helmet());
app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(requestLogger);
app.use(express.json());

const users = require("./routes/users");
const clothingItems = require("./routes/clothingItems");

const { validateUserBody, validateLogin } = require("./middlewares/validation");

app.post("/signup", authLimiter, validateUserBody, createUser);
app.post("/signin", authLimiter, validateLogin, login);

app.use("/items", clothingItems);
app.use("/users", users);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
