const sendNotificationEmail = ({
  transporter,
  email,
  subject,
  text,
  senderEmail,
}) => {
  console.log("email to be sent", email);
  console.log("subject to be sent", subject);
  console.log("text to be sent", text);
  const htmlContent = `
    <p style="font-size: 16px; color: #333;">Welcome to Ethiopian Federal Police</p>
    <p style="font-size: 16px; color: #333;">${text}</p>
    
  `;
  const mailOptions = {
    from: senderEmail,
    to: email,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("dont send email", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendNotificationEmail;
