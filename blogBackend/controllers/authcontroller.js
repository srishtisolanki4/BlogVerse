const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../model/user');

dotenv.config();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists, please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();

    // include id for easier identification later
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly:true,
      sameSite:"lax",
      secure:false,
      maxAge: 60 * 60 * 1000,
      overwrite:true
    });

    return res.status(201).json({
      message: "Registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });

  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User not found, please register" });
    }

    const compared = await bcrypt.compare(password, oldUser.password);
    if (!compared) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: oldUser._id, email: oldUser.email, name: oldUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly:true,
      sameSite:"lax",
      secure:false,
      maxAge: 60 * 60 * 1000,
      overwrite:true
    });

    return res.status(200).json({
      message: "Logged in successfully",
      user: { id: oldUser._id, name: oldUser.name, email: oldUser.email }
    });

  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

module.exports = { register, login };
