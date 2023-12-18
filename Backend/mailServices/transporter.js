
// const emailConfig = require("./emailConfig");

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "misganmoges03@gmail.com",
    pass: "rxgctnfhdohjtgqd",
  },
});

module.exports = transporter;
