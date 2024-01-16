const nodemailer = require("nodemailer");

// Function to configure transporter with dynamic sender email and password
const emailConfig = (senderEmail, senderPass) => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderPass,
    },
  });
};

module.exports = emailConfig;
