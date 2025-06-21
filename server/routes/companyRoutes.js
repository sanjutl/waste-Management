const express = require('express');
const router = express.Router();
const {
  companyregister
} = require('../controllers/companyController');

router.post('/companyregister', companyregister);

module.exports = router;
