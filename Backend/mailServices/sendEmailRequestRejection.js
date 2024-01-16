const sendEmailRequestRejection = ({
  transporter,
  email,
  subject,
  text,
  senderEmail,
}) => {
  console.log("email to be sent", email);
  console.log("subject to be sent", subject);
  console.log("text to be sent", text);
  console.log("senderEmail to be sent", senderEmail);

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
    <p style="font-size: 16px; color: #333;">Dear User,</p>
    <p style="font-size: 16px; color: #333;">
      We regret to inform you that your recent request has been rejected.
      Please review the feedback below and make the necessary changes to your application before reapplying.
      If you have any questions or concerns, feel free to contact our support team for assistance.
    </p>
    
    <p style="font-size: 16px; color: #333;">
      <strong>Reason for Rejection:</strong><br />
      <p style ="color:red;">${text}</p> 
    </p>
    <p style="font-size: 16px; color: #333;">
      We appreciate your understanding and look forward to receiving your updated application.
    </p>

    <p style="font-size: 16px; color: #333;">Best Regards,</p>
    <p style="font-size: 16px; color: #333;">Ethiopian Federal Police Commission</p>
  </div>
`;
  const mailOptions = {
    from: senderEmail,
    to: email,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Failed to send email", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmailRequestRejection;
