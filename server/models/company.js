const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    contactPerson: { type: String },
    businessEmail: { type: String },
    serviceArea: { type: String },
    serviceProvided: { type: String },
    additionalInfo: { type: String }
});

module.exports = mongoose.model('Company', companySchema);
