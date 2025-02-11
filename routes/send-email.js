const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
 
router.post('/', async (req, res) => {
  const { from, to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    html: `
      <html lang="en">
          <head>
              <style>
                h1{color: blue;} h2{color: red;} h3{color: cadetblue;} h4{color: slategray;}
              </style>
          </head>
          <body>
            <h1>Welcome to Nodemailer</h1>
            <h2>Your email was sent successfully!</h2>
            <h3>Subject: ${subject}</h3>
            <h4>Message: ${text}</h4>
          </body>
        </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.render('error', { message: 'Failed to send the email.' });
  }
});

module.exports = router;