const transporter = require("./transporter");

const sendNotificationEmail = ({ email, subject, text }) => {
  const htmlContent = `
    <p style="font-size: 16px; color: #333;">Welcome to Ethiopian Federal Police</p>
    <p style="font-size: 16px; color: #333;">${text}</p>
    
  `;
  const mailOptions = {
    from: "misganmoges03@gmail.com",
    to: email,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendNotificationEmail;
