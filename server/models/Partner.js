const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  companyName: String,
  contactPerson: String,
  email: String,
  serviceArea: String,
  services: [String],
  additionalInfo: String,
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Partner', partnerSchema);
