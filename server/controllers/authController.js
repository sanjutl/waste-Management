const User = require('../models/user');
const Driver = require('../models/driver');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    let user = await User.findOne({ email }).select("+password");

    let role = null;

    if (user) {
      role = user.role || "300"; // normal user role
    } else {
      user = await Driver.findOne({ email }).select("+password");

      if (user) {
        if (user.status !== "approved") {
          return res.status(403).json({ message: "Driver not approved by admin yet" });
        }
        role = "500"; // driver role
      } else {
        user = await Admin.findOne({ email }).select("+password");
        if (user) {
          role = "400"; // admin role
        }
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1d" }
    );

    // Prepare response data
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role,
    };

    // Add extra driver fields if driver
    if (role === "500") {
      userData.phone = user.phone;
      userData.vehicleNumber = user.vehicleNumber;
    }

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
};
