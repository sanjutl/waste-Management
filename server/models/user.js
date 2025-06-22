const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  pickupTime: { type: String },
  paymentMethod: { type: String },
  recyclable: {
    item: { type: String },
    kg: { type: Number },
  },
  nonRecyclable: {
    item: { type: String },
    kg: { type: Number },
  },
  phone: { type: String },

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    default: null,
  },
  role: { type: String, default: 300 },
  orders: [
    {
      address: String,
      pickupTime: {
        type: Date,
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      recyclable: {
        item: {
          type: String,
          enum: ["plastic", "iron", "paper", "clothes"], // example values
        },
        kg: {
          type: Number,
          min: 0,
        },
      },
      nonRecyclable: {
        item: {
          type: String,
          enum: ["medical waste", "e-waste", "clinic waste", "glass waste"], // example
        },
        kg: {
          type: Number,
          min: 0,
        },
      },
      phone: {
        type: String,
        required: true,
      },
      driver: {
        type: String,
        default: "Pending",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ["Pending", "Accepted"],
        default: "Pending",
      },
      review: {
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
