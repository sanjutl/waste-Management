const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const pickupRoutes = require('./routes/pickupRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pickups', pickupRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/user', userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1); // Exit if DB connection fails
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
