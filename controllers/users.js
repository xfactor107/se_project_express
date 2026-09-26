const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ClothingItem = require("../models/clothingItem");
const { defaultClothingItems } = require("../utils/defaultClothingItems");
const { JWT_SECRET } = require("../utils/config");

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../utils/customErrors");

const createUser = async (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  try {
    if (await User.exists({ email })) {
      return next(new ConflictError("This email is already registered."));
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, avatar, email, password: hash });

    // Give the new user a starter wardrobe. If that fails, remove the user so
    // a retry with the same email doesn't hit a duplicate-key error.
    const itemsToInsert = defaultClothingItems.map((item) => ({
      name: item.name,
      weather: item.weather.toLowerCase(),
      imageUrl: item.imageUrl,
      owner: user._id,
    }));
    try {
      await ClothingItem.insertMany(itemsToInsert);
    } catch (insertErr) {
      await User.findByIdAndDelete(user._id);
      throw insertErr;
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return res.status(201).send({ data: userWithoutPassword });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError(err.message));
    }
    if (err.code === 11000) {
      return next(new ConflictError("This email is already registered."));
    }
    return next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const getCurrentUser = (req, res, next) => {
  if (!req.user || !req.user._id) {
    return next(new UnauthorizedError("Authorization required"));
  }
  const userId = req.user._id;
  return User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
};
