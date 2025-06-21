const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  editUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser/:id', getUser)
router.patch('/edituser/:id', editUser)

module.exports = router;
