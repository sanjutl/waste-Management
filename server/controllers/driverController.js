const Driver = require('../models/driver')
const { passwordValidator } = require("../utils/passwordValidator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user'); 

exports.registerDriver = async (req, res) => {
  let { name, email, password, phone, vehicleNumber } = req.body;

  try {
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();
    phone = phone?.trim();
    vehicleNumber = vehicleNumber?.trim();

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const isValidPassword = passwordValidator(password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character",
      });
    }

    const existingUser = await Driver.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Driver.create({
      name,
      email,
      password: hashedPassword,
      phone,
      vehicleNumber,
      status: "approved"
    });

    const createdUser = await Driver.findById(user._id).select("-password");

    return res.status(201).json({
      message: "Driver Registration Successful",
      data: createdUser
    });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
};




exports.loginDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Driver.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email doesn't exist" });
    }

    if (user.status !== "approved") {
      return res.status(403).json({ message: "Driver not approved by admin yet" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        vehicleNumber: user.vehicleNumber
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
};


exports.getAllDrivers = async (req, res) => {
  try {
    const allDrivers = await Driver.find().select("-password");
    res.status(200).json({ message: "Drivers fetched successfully", data: allDrivers });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};


exports.verifyDriver=async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json({ success: true, driver });
  } catch (err) {
    res.status(500).json({ error: "Failed to approve driver" });
  }
};
exports.allVerfiedDrivers=async (req, res) => {
  try {
    const approvedDrivers = await Driver.find({ status: "approved" });
    res.json({ success: true, drivers: approvedDrivers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch approved drivers" });
  }
};





exports.allVerfiedgetOrders = async function (req, res) {
  const { driverName } = req.params; // extract string from req

  try {
    const users = await User.find({ "orders.driver": driverName });

    const driverOrders = [];

    users.forEach(user => {
      const matchedOrders = user.orders.filter(order => order.driver === driverName);
      matchedOrders.forEach(order => {
        driverOrders.push({
          ...order.toObject(),
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone,
        });
      });
    });

    return res.status(200).json({ success: true, orders: driverOrders });
  } catch (error) {
    console.error("Error fetching driver orders:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

