const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Only for local dev
  },
});

// POST route for the contact form
router.post('/contact', async (req, res) => {
  const { email, subject, message, website, captchaToken } = req.body;

  // Honeypot spam check
  if (website) {
    console.warn("Honeypot triggered - likely spam bot");
    return res.status(400).json({ message: "Spam detected." });
  }

  // Basic input validation
  if (!email || !subject || !message || !email.includes('@')) {
    return res.status(400).json({ message: "Invalid input." });
  }

  // CAPTCHA required
  if (!captchaToken) {
    return res.status(400).json({ message: "CAPTCHA required." });
  }

  // Verify reCAPTCHA token
  try {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaToken}`;
    const captchaRes = await axios.post(verifyURL);
    if (!captchaRes.data.success) {
      console.warn("🚨 CAPTCHA failed:", captchaRes.data);
      return res.status(403).json({ message: "CAPTCHA verification failed." });
    }
  } catch (error) {
    console.error("CAPTCHA verification error:", error);
    return res.status(500).json({ message: "Error verifying CAPTCHA." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: email,
    subject: `Contact Form: ${subject}`,
    text: `
You received a new message from your website contact form:

From: ${email}
Subject: ${subject}

Message:
${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: 'Error sending email' });
    };
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

module.exports = router;
