const Driver = require('../models/driver')
const { passwordValidator } = require("../utils/passwordValidator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerDriver = async (req, res) => {
    let { name, email, password, number } = req.body;

    try {
        // Sanitize inputs
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        number = number?.trim();

        if (!name || !email || !password || !number) {
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
        const existingUser = await Driver.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await Driver.create({
            name,
            email,
            password: hashedPassword,
            number
        });

        const createdUser = await Driver.findById(user._id).select("-password");
        if (!createdUser) {
            return res.status(500).json({ message: "Driver registration failed" });
        }

        return res
            .status(201)
            .json({ message: "Driver Registration Successful", data: createdUser });
    } catch (err) {
        console.error("Error during registration:", err);
        return res
            .status(500)
            .json({ message: `Internal Server Error: ${err.message}` });
    }
};



exports.loginDriver = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user
        const user = await Driver.findOne({ email });
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
                number: user.number
            },
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res
            .status(500)
            .json({ message: `Internal Server Error: ${err.message}` });
    }
};


exports.getAllDrivers = async (req, res) => {
    try {
        const allDrivers = await Driver.find();
        res.status(200).json({ message: "Drivers Fetched Succesfuuly", data: allDrivers })
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${err.message}` })
    }
};