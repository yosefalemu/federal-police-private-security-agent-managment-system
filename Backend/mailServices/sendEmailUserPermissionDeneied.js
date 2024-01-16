const sendEmailUserPermissionDeneied = ({
  transporter,
  email,
  subject,
  text,
  senderEmail,
  firstName,
  middleName,
  lastName,
}) => {
  console.log("email to be sent", email);
  console.log("subject to be sent", subject);
  console.log("text to be sent", text);
  console.log("text to be sent", senderEmail);

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
    <p style="font-size: 16px; color: #333;">Dear ${firstName} ${middleName} ${lastName}</p>
    <p style="font-size: 16px; color: #333;">
      We regret to inform you that your access permission has been restricted.
      Please be aware that certain functionalities may no longer be available.
      If you believe this is an error or have any concerns, kindly contact our support team for assistance.
    </p>
    
    <p style="font-size: 16px; color: #333;">
      <strong>Reason for Access Restriction:</strong><br />
      <p style ="color:red;">${text}</p> 
    </p>
    <p style="font-size: 16px; color: #333;">
      We appreciate your understanding.
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
      console.log("dont send email", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmailUserPermissionDeneied;
