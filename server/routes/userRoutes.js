const express = require('express');
const   router = express.Router();
const {
  registerUser,
  loginUser,
  getUserOrders,
  editUser,
  updateOrderStatus
} = require('../controllers/userController');

router.post('/register', registerUser);
// router.post('/login', loginUser);
router.get('/getUser/:id', getUserOrders)
router.patch('/edituser/:id', editUser)
router.put("/update-status/:userId/:orderId", updateOrderStatus);


module.exports = router;
