const express = require('express');
const router = express.Router();
const {
    registerDriver,
    loginDriver,
    getAllDrivers
} = require('../controllers/driverController');

router.post('/registerdriver', registerDriver);
router.post('/logindriver', loginDriver);
router.get('/alldrivers', getAllDrivers)

module.exports = router;
