const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    number: { type: String },
    role: { type: String, default: 500 }
});

module.exports = mongoose.model('Driver', driverSchema);
