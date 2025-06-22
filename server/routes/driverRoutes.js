const express = require('express');
const router = express.Router();
const {
    registerDriver,
    loginDriver,
    getAllDrivers,
    verifyDriver,
    allVerfiedDrivers,
    allVerfiedgetOrders
} = require('../controllers/driverController');

router.post('/registerdriver', registerDriver);
router.post('/logindriver', loginDriver);
router.get('/alldrivers', getAllDrivers);
router.put('/verify/:id', verifyDriver);
router.get('/verified-drivers', allVerfiedDrivers); 
router.get('/orders/:driverName', allVerfiedgetOrders);
module.exports = router;
