const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/games');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');

const app = express();

// Middlewares
app.use(bodyParser.json()); // For parsing application/json

// Routes
app.use('/api', gameRoutes);    // All game-related routes
app.use('/api', blogRoutes);    // All blog-related routes
app.use('/api', contactRoutes); // For contact form and email handling

// MongoDB connection
mongoose.connect('mongodb://localhost/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
