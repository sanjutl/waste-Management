// const Pickup = require('../models/Pickup');

const Pickup = require('../models/Pickup.js'); // adjust path as needed

exports.createPickup = async (req, res) => {
  try {
    const {
      address,
      pickupTime,
      paymentMethod,
      recyclable,
      nonRecyclable,
    } = req.body;

    // Basic required fields
    if (!address || !pickupTime || !paymentMethod) {
      return res.status(400).json({
        error: "Address, pickup time, and payment method are required.",
      });
    }

    // Validate recyclable
    const recyclableKg = parseFloat(recyclable?.kg);
    const isRecyclableValid =
      recyclable?.item &&
      !isNaN(recyclableKg) &&
      recyclableKg > 0;

    // Validate nonRecyclable
    const nonRecyclableKg = parseFloat(nonRecyclable?.kg);
    const isNonRecyclableValid =
      nonRecyclable?.item &&
      !isNaN(nonRecyclableKg) &&
      nonRecyclableKg > 0;

    if (!isRecyclableValid && !isNonRecyclableValid) {
      return res.status(400).json({
        error: "At least one valid waste type with weight must be provided.",
      });
    }

    const newPickup = new Pickup({
      address: address.trim(),
      pickupTime,
      paymentMethod,
      recyclable: isRecyclableValid ? {
        item: recyclable.item,
        kg: recyclableKg,
        amount: recyclable.amount || 0
      } : null,
      nonRecyclable: isNonRecyclableValid ? {
        item: nonRecyclable.item,
        kg: nonRecyclableKg,
        amount: nonRecyclable.amount || 0
      } : null,
    });

    const savedPickup = await newPickup.save();

    return res.status(201).json({
      message: "Pickup request created successfully",
      data: savedPickup,
    });

  } catch (err) {
    console.error("Pickup creation failed:", err);
    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};





exports.getAllPickups = async (req, res) => {
  try {
    const statusFilter = req.query.status;
    const pickups = statusFilter
      ? await Pickup.find({ status: statusFilter })
      : await Pickup.find();
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePickup = async (req, res) => {
  try {
    const pickup = await Pickup.findByIdAndDelete(req.params.id);
    if (!pickup) {
      return res.status(404).json({ message: 'Pickup not found' });
    }
    res.status(200).json({ message: 'Pickup deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 exports.updatePickup = async (req, res) => {
  try {
    const pickup = await Pickup.findByIdAndUpdate(
      req.params.id,
      { status: "Accepted" }, // Capital "A"
      { new: true }
      
    );
    console.log(req.params.id);

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    res.status(200).json({ message: "Pickup accepted", pickup });
  } catch (error) {
    console.error("Error accepting pickup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
