//utils/sendEmail.js

const nodemailer = require("nodemailer");

module.exports = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully!!", info.response);
    console.log("Sending from:", process.env.EMAIL_USER);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};
