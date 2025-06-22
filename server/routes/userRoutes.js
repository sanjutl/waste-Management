const express = require('express');
const   router = express.Router();
const {
  registerUser,
  loginUser,
  getUserOrders,
  editUser,
  updateOrderStatus,
  addReviewToOrder,
  getDriverReviews
} = require('../controllers/userController');

router.post('/register', registerUser);
// router.post('/login', loginUser);
router.get('/getUser/:id', getUserOrders)
router.patch('/edituser/:id', editUser)
router.put("/update-status/:userId/:orderId", updateOrderStatus);
router.put("/orders/review/:userId/:orderId", addReviewToOrder);
router.get("/driver-reviews/:driverName", getDriverReviews);



module.exports = router;
