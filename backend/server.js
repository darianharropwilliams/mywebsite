require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const gameRoutes = require('./routes/games');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');

const app = express();

// Middlewares
app.use(bodyParser.json()); // For parsing application/json


const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1, // limit each IP to 1 request per window
  message: { message: 'Too many messages sent. Please try again later.' },
});


// Routes
// app.use('/api', gameRoutes);    // All game-related routes
app.use('/api', blogRoutes);    // All blog-related routes
app.use('/api', contactRoutes); // For contact form and email handling
app.use('/api/contact', contactLimiter);



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  // remove deprecated options
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);
});



const projectRoutes = require('./routes/projectRoutes');
app.use('/api', projectRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
