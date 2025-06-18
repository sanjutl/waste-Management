const Partner = require('../models/Partner');

exports.createPartner = async (req, res) => {
  console.log("Received Partner Data:", req.body); // Debug log

  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (err) {
    console.error("Partner Creation Error:", err); // Detailed error
    res.status(400).json({ error: err.message });
  }
};

exports.getPendingPartners = async (req, res) => {
  const partners = await Partner.find({ approved: false });
  res.json(partners);
};

exports.approvePartner = async (req, res) => {
  const { id } = req.params;
  const updated = await Partner.findByIdAndUpdate(id, { approved: true }, { new: true });
  res.json(updated);
};
