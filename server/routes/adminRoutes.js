const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin
} = require('../controllers/adminController');

router.post('/adminregister', registerAdmin);
router.post('/adminlogin', loginAdmin);

module.exports = router;
