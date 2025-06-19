const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  address: { type: String, required: true, trim: true },
  pickupTime: { type: String, required: true },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'COD'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted'],
    default: 'Pending'
  },
  phone: { type: String, required: true },
  recyclable: {
    item: { type: String },
    kg: { type: Number, min: 0 },
    amount: { type: Number, min: 0 }
  },
  nonRecyclable: {
    item: { type: String },
    kg: { type: Number, min: 0 },
    amount: { type: Number, min: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Pickup', pickupSchema);
