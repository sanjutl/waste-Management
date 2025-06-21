const Company = require('../models/company')
const { passwordValidator } = require("../utils/passwordValidator")
const bcrypt = require("bcryptjs");


exports.companyregister = async (req, res) => {
    let { name, email, password, contactPerson, businessEmail, serviceArea, serviceProvided, additionalInfo } = req.body;

    try {

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
        const existingUser = await Company.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const company = await Company.create({
            name,
            email,
            password: hashedPassword,
            contactPerson,
            businessEmail,serviceArea,serviceProvided,additionalInfo
        });

        const createdUser = await Company.findById(company._id).select("-password");
        if (!createdUser) {
            return res.status(500).json({ message: "Company registration failed" });
        }

        return res
            .status(201)
            .json({ message: "Company Registration Successful", data: createdUser });
    } catch (err) {
        console.error("Error during registration:", err);
        return res
            .status(500)
            .json({ message: `Internal Server Error: ${err.message}` });
    }
};