const Pickup = require('../models/Pickup');

exports.createPickup = async (req, res) => {
  try {
    const newPickup = await Pickup.create(req.body);
    res.status(201).json(newPickup);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
