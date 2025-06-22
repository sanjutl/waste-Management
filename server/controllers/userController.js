const User = require('../models/user')
const { passwordValidator } = require("../utils/passwordValidator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerUser = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        // Sanitize inputs
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password strength
        const isValidPassword = passwordValidator(password);
        if (!isValidPassword) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character",
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            return res.status(500).json({ message: "User registration failed" });
        }

        return res
            .status(201)
            .json({ message: "User Registration Successful", data: createdUser });
    } catch (err) {
        console.error("Error during registration:", err);
        return res
            .status(500)
            .json({ message: `Internal Server Error: ${err.message}` });
    }
};



exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email doesn't exist" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT
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
            },
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res
            .status(500)
            .json({ message: `Internal Server Error: ${err.message}` });
    }
}

exports.getUser = async (req, res) => {
    try {
        const getUser = await User.findById();
        console.log("User:", getUser);

        if (!getUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User Fetched", data: getUser });
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

// In your controller
exports.getUserOrders = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "Orders retrieved successfully",
            data: user.orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving orders",
            error: error.message
        });
    }
};



exports.editUser = async (req, res) => {
    const id = req.params.id;
    const { 
        address,
        pickupTime,  // This should be a full datetime string
        paymentMethod,
        recyclable,
        nonRecyclable,
        phone, 
        driver 
    } = req.body;

    // Validation
    if (!address || !pickupTime || !paymentMethod || !phone) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Create proper date object (combine with current date if only time provided)
        let pickupDate;
        if (pickupTime.match(/^\d{2}:\d{2}$/)) {
            const [hours, minutes] = pickupTime.split(':');
            pickupDate = new Date();
            pickupDate.setHours(hours, minutes, 0, 0);
        } else {
            pickupDate = new Date(pickupTime);
        }

        const newOrder = {
            address,
            pickupTime: pickupDate,
            paymentMethod,
            phone,
            driver: driver || "Pending",
            ...(recyclable && { 
                recyclable: {
                    item: recyclable.item,
                    kg: Number(recyclable.kg)
                } 
            }),
            ...(nonRecyclable && { 
                nonRecyclable: {
                    item: nonRecyclable.item,
                    kg: Number(nonRecyclable.kg)
                } 
            })
        };

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { orders: newOrder } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "Order added successfully", 
            data: updatedUser.orders 
        });
    } catch (error) {
        console.error("Error adding order:", error);
        res.status(500).json({ 
            message: "Error adding order",
            error: error.message 
        });
    }
};
exports.updateOrderStatus = async (req, res) => {
  const { userId, orderId } = req.params;
  const { status } = req.body; // e.g. "approved", "pending", "rejected"

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    // Update the order status in the orders array where _id = orderId
    const user = await User.findOneAndUpdate(
      { _id: userId, "orders._id": orderId },
      { $set: { "orders.$.status": status } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User or order not found" });
    }

    // Find the updated order to return
    const updatedOrder = user.orders.find(order => order._id.toString() === orderId);

    res.status(200).json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};