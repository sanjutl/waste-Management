const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    pickupTime: { type: String },
    paymentMethod: { type: String },
    recyclable: { type: String },
    nonRecyclable: { type: String },
    phone: { type: String },
    driver: { type: String },
    role: { type: String, default: 300 }
});

module.exports = mongoose.model('User', userSchema);
