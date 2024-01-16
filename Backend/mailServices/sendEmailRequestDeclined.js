const sendEmailRequestDeclined = ({
  transporter,
  email,
  subject,
  text,
  senderEmail,
  firstName,
  middleName,
  lastName,
}) => {
  console.log("reciever email", email);
  console.log("sender email", senderEmail);
  console.log("text", text);
  console.log("subject", subject);
  console.log("firstName", firstName);

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
    <p style="font-size: 16px; color: #333;">Dear ${firstName} ${middleName} ${lastName},</p>
    <p style="font-size: 16px; color: #333;">
      We regret to inform you that your recent application has been declined.
      Below are the details of the rejection:
    </p>
    
    <p style="font-size: 16px; color: #333;">
      <strong>Reason for Rejection:</strong><br />
      <p style ="color:red;">${text}</p> 
    </p>

    <p style="font-size: 16px; color: #333;">
      We encourage you to review the feedback and make the necessary modifications to your document. You are welcome to reapply with the corrected document, ensuring compliance with the specified requirements. If you have any questions or need further assistance, please feel free to contact our support team.
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

module.exports = sendEmailRequestDeclined;
