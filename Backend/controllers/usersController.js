const UserSchema = require("../models/usersModel");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const sendNotificationEmail = require("../mailServices/sendNotificationEmail");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmailUserPermissionDeneied = require("../mailServices/sendEmailUserPermissionDeneied");
const emailConfig = require("../mailServices/emailConfig");
const sendEmailAddUser = require("../mailServices/sendEmailAddUser");

const createUser = async (req, res) => {
  const {
    email,
    senderEmail,
    senderEmailPass,
    role,
    password,
    nationalId,
    firstName,
    middleName,
    lastName,
  } = req.body;

  const userExists = await UserSchema.findOne({
    $or: [{ email }, { nationalId }],
  });

  if (userExists) {
    if (userExists.email === email) {
      throw new BadRequestError("Email is already taken");
    } else if (userExists.nationalId === nationalId) {
      throw new BadRequestError("National ID is already taken");
    }
  }

  const user = await UserSchema.create(req.body);

  if (user) {
    await user.save();
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    const senderTransporter = emailConfig(senderEmail, senderEmailPass);
    sendEmailAddUser({
      transporter: senderTransporter,
      email,
      subject: "Access Permission Granted",
      password,
      senderEmail,
      role,
      firstName,
      middleName,
      lastName,
    });
    res.status(StatusCodes.CREATED).json({ user });
  } else {
    res.status(400);
    throw new BadRequestError("Invalid user data");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email) {
    throw new BadRequestError("email required");
  }
  if (!password) {
    throw new BadRequestError("password required");
  }
  const user = await UserSchema.findOne({ email, persmission: "allowed" });
  console.log(user);
  if (!user) {
    throw new UnauthenticatedError("Invalid creditials");
  }

  const validPassword = await user.comparePassword(password);
  if (validPassword) {
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json(user);
  } else {
    throw new UnauthenticatedError("wrong password");
  }
};
const getAdminFromUser = async (req, res) => {
  const admins = await UserSchema.find({ role: "admin" });
  if (!admins) {
    throw new BadRequestError("No manager assigned yet!");
  }
  res.status(StatusCodes.OK).json(admins);
};

const updateUserByAdmin = async (req, res) => {
  const userId = req.params.userId;
  console.log("req.body", req.body.dataToBeUpdated);
  const { newPasswordToUpdated } = req.body.dataToBeUpdated;
  const {
    persmission,
    email,
    text,
    senderEmail,
    emailPass,
    firstName,
    middleName,
    lastName,
  } = req.body.dataToBeUpdated;
  let hashedPassword = "";

  let updateObject = {};

  if (newPasswordToUpdated) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(newPasswordToUpdated, salt);
    updateObject = {
      ...req.body.dataToBeUpdated,
      password: hashedPassword,
    };
  } else {
    updateObject = {
      ...req.body.dataToBeUpdated,
    };
  }
  console.log("updated Object", updateObject);
  const updatedUser = await UserSchema.findOneAndUpdate(
    { _id: userId },
    updateObject,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!updatedUser) {
    return res
      .status(404)
      .json({ error: `There is no user with id ${userId}` });
  }

  if (persmission) {
    if (persmission === "allowed") {
      console.log("enable allow ");
      const senderTransporter = emailConfig(senderEmail, emailPass);
      sendNotificationEmail({
        transporter: senderTransporter,
        email: email,
        subject: "Access Permission Granted",
        text: `Congratulations! Dear ${firstName} ${middleName} ${lastName}, You have successfully regained access permission. We are delighted to inform you that your access has been reinstated. Your commitment to compliance and security is highly appreciated. Should you have any further questions or concerns, please do not hesitate to reach out. Thank you for your cooperation.`,
        senderEmail: senderEmail,
      });
    } else {
      console.log("disable permission");
      const senderTransporter = emailConfig(senderEmail, emailPass);
      sendEmailUserPermissionDeneied({
        transporter: senderTransporter,
        email: email,
        subject: "Access Restriction Notification",
        text: text,
        senderEmail: senderEmail,
        firstName,
        middleName,
        lastName,
      });
    }
  }
  res.status(200).json(updatedUser);
};

const logout = async (req, res) => {
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const getAllUsers = async (req, res) => {
  const users = await UserSchema.find({});
  if (users) {
    res.status(201).json({ users });
  } else {
    throw new BadRequestError("No users yet");
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserSchema.findById(id);
    if (!user) {
      throw new BadRequestError(`there is no user with id ${id}`);
    }
    // checkPermissions(req.user, user._id);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
// update user with user.save()
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, role } = req.body;
  // console.log(role)
  if (!role) {
    throw new CustomError.BadRequestError("Please provide new role");
  }
  const user = await UserSchema.findById(id);
  user.role = role;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateProfile = async (req, res) => {
  const id = req.params.id;
  const { firstName, middleName, lastName, phoneNumber, profilePicture } =
    req.body;
  if (!firstName || !middleName || !lastName || !phoneNumber) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await UserSchema.findOne({ _id: id });

  user.firstName = firstName;
  user.middleName = middleName;
  user.lastName = lastName;
  user.phoneNumber = phoneNumber;
  user.profilePicture = profilePicture;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }
  const user = await UserSchema.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }

  const profileImage = req.files.image;

  if (!profileImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }

  const maxSize = 1024 * 1024;

  if (profileImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload an image smaller than 1MB"
    );
  }

  const sanitizedFileName = profileImage.name.replace(/\s+/g, "-");

  // Add date prefix to the file name
  const currentDate = new Date();
  const datePrefix = currentDate.toISOString().replace(/:/g, "-").slice(0, 19); // Format: YYYY-MM-DDTHH-mm-ss
  const prefixedFileName = `${datePrefix}-${sanitizedFileName}`;

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + prefixedFileName
  );

  await profileImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `${prefixedFileName}` });
};

module.exports = {
  createUser,
  loginUser,
  getAdminFromUser,
  updateUserByAdmin,
  logout,
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateProfile,
  updateUserPassword,
  uploadImage,
};
