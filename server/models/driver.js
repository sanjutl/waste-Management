const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: { type: String, required: true },
  vehicleNumber: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "approved"
  },
  role: { type: String, default: 500 }
});

module.exports = mongoose.model("Driver", driverSchema);