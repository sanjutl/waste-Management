const express = require('express');
const router = express.Router();
const {
  createPickup,
  getAllPickups,
  deletePickup,
  updatePickup
} = require('../controllers/pickupController');

router.post('/createpickup', createPickup);
router.get('/', getAllPickups);
router.delete('/:id', deletePickup); // ✅ Only Admin panel uses this
router.patch("/accept/:id",updatePickup)

module.exports = router;
