const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: 400 }
});

module.exports = mongoose.model('Admin', adminSchema);
