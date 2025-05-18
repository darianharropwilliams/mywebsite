require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

// Route imports
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Replace '*' with specific domain for better security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(bodyParser.json());

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  message: { message: 'Too many messages sent. Please try again later.' },
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);
});

// API routes
app.use('/api', blogRoutes);
app.use('/api', contactRoutes);
app.use('/api/contact', contactLimiter);
app.use('/api', projectRoutes);
app.use('/api', skillRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
