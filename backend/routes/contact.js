const express = require('express');
const nodemailer = require('nodemailer'); // Import Nodemailer
const router = express.Router();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any other service like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable for email
    pass: process.env.EMAIL_PASS, // Use environment variable for password
  },
  tls: {
    rejectUnauthorized: false  // Disable certificate validation (ONLY for local dev)
  }
});

// POST route for the contact form
router.post('/contact', (req, res) => {
  const { email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL, // Send to your email or any recipient
    subject: subject,
    text: message,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

module.exports = router;
