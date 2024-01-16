const sendEmailRequestAccepted = ({
  transporter,
  email,
  subject,
  password,
  senderEmail,
  firstName,
  middleName,
  lastName,
}) => {
  console.log("email to be sent", email);
  console.log("subject to be sent", subject);
  console.log("password to be sent", password);
  console.log("senderEmail to be sent", senderEmail);

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
    <p style="font-size: 16px; color: #333;">Dear User,</p>
    <p style="font-size: 16px; color: #333;">
      Congratulations! Dear ${firstName} ${middleName} ${lastName}, Your recent request has been accepted.
      Below are your login details for the initial login. Please change your password after your first login for security purposes.
    </p>
    
    <p style="font-size: 16px; color: #333;">
      <strong>Login Details:</strong><br />
      <strong>Email:</strong> ${email}<br />
      <strong>Password:</strong> ${password}<br />
    </p>
    <p style="font-size: 16px; color: #333;">
      After your first login, you will unlock a world of possibilities. You'll have the authority to strategically manage and lead your team of employees. This includes the power to make impactful hiring decisions, shaping the workforce to achieve organizational goals. Additionally, you'll be able to oversee and guide your team of agents, ensuring efficiency and success in every endeavor.
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

module.exports = sendEmailRequestAccepted;
