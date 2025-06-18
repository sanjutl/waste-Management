const express = require('express');
const router = express.Router();
const { createPartner, getPendingPartners, approvePartner } = require('../controllers/partnerController');

router.post('/', createPartner);
router.get('/pending', getPendingPartners);
router.put('/approve/:id', approvePartner);

module.exports = router;
