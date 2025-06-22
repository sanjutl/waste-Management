const Partner = require('../models/Partner');

const bcrypt = require("bcryptjs"); 

exports.createPartner = async (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      serviceArea,
      additionalInfo,
      password
    } = req.body;

    if (!companyName || !contactPerson || !email || !serviceArea  || !password) {
      return res.status(400).json({ message: "All fields except additional info are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existing = await Partner.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Partner with this email already exists" });
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const partner = await Partner.create({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim(),
      serviceArea: serviceArea.trim(),
      additionalInfo: additionalInfo?.trim() || "",
      password: hashedPassword, // ✅ save hashed password
    });

    res.status(201).json({ message: "Partner registered successfully", data: partner });
  } catch (err) {
    console.error("Partner Creation Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getPendingPartners = async (req, res) => {
  try {
    const partners = await Partner.find({ approved: false });
    res.status(200).json(partners);
  } catch (err) {
    console.error("Error fetching pending partners:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.approvePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Partner.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json({ message: "Partner approved", data: updated });
  } catch (err) {
    console.error("Error approving partner:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

