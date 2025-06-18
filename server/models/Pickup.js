const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  wasteType: { type: String, required: true },
  pickupTime: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Accepted'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Pickup', pickupSchema);
