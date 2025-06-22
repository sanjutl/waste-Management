const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  companyName: String,
  contactPerson: String,
  email: String,
  serviceArea: String,
  additionalInfo: String,
  password: { type: String, required: true },
  role: { type: String, default: 600 },
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model("Partner", partnerSchema);
