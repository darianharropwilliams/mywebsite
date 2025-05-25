require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

console.log('[INIT] Starting server setup');

const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();

console.log('[MIDDLEWARE] Applying Helmet');
app.use(helmet());

console.log('[MIDDLEWARE] Applying CORS');

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DEV_URL,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use(bodyParser.json());

const contactLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
  message: { message: 'Too many messages sent. Please try again later.' },
});

console.log('[DB] Connecting to MongoDB...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('[DB] MongoDB connection successful'))
  .catch((err) => console.error('[DB] MongoDB connection error:', err.message));

console.log('[ROUTES] Registering API routes');
app.use('/api', blogRoutes);
app.use('/api', contactRoutes);
app.use('/api/contact', contactLimiter);
app.use('/api', projectRoutes);
app.use('/api', skillRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Listening on port ${PORT}`);
});

app.get('/healthz', (req, res) => {
  console.log('[HEALTH CHECK] /healthz hit');
  res.status(200).send('OK');
});
