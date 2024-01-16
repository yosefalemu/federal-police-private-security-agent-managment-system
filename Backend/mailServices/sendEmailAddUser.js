const sendEmailAddUser = ({
  transporter,
  email,
  subject,
  password,
  senderEmail,
  role,
  firstName,
  middleName,
  lastName,
}) => {
  console.log("email to be sent", email);
  console.log("subject to be sent", subject);
  console.log("password to be sent", password);
  console.log("senderEmail to be sent", senderEmail);
  console.log("role of user", role);

  let roleDescription = "";
  if (role === "screener") {
    roleDescription = "screener";
  } else if (role === "admin") {
    roleDescription = "manager";
  }

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
    <p style="font-size: 16px; color: #333;">Dear, ${firstName} ${middleName} ${lastName}</p>
    <p style="font-size: 16px; color: #333;">
      Congratulations! You have been added to the Federal Police Private Security Agent HR Management System as a ${roleDescription}.
      Below are your login details for the initial login. Please change your password after your first login for security purposes.
    </p>
    
    <p style="font-size: 16px; color: #333;">
      <strong>Login Details:</strong><br />
      <strong>Email:</strong> ${email}<br />
      <strong>Password:</strong> ${password}<br />
    </p>
    <p style="font-size: 16px; color: #333;">
      After your first login, you will have specific responsibilities:
      ${
        roleDescription === "screener"
          ? "You can review agent applications and documents. If an application is incomplete, you have the authority to reject the document and send appropriate email to the applicant. You can also engage in group chat with managers, agents, and other users on relevant issues."
          : ""
      }
      ${
        roleDescription === "manager"
          ? "You have comprehensive control over the system. You can oversee and manage all agents and employees under your authority. Additionally, you can add or remove permissions for both agents, admins, and other users. You have the ability to send appropriate emails regarding permission changes and can participate in group chat with other managers and users on relevant issues."
          : ""
      }
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

module.exports = sendEmailAddUser;
