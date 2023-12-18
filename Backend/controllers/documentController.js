const UserSchema = require("../models/usersModel");
const DocumentSchema = require("../models/documentModel");
const AgentSchema = require("../models/agentsModel");
const { BadRequestError, NotFoundError } = require("../errors");
const sendNotificationEmail = require("../mailServices/sendNotificationEmail");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const createDocument = async (req, res) => {
  const { email, firstName, middleName, lastName } = req.body;
  const documentExists = await DocumentSchema.findOne({
    $or: [{ email }],
  });
  if (documentExists) {
    if (documentExists.email === email) {
      throw new BadRequestError("the email is already exist in the doucments");
    } else {
      throw new BadRequestError("The Document already exist in the system");
    }
  }
  const document = await DocumentSchema.create(req.body);

  if (document) {
    await document.save();
    res.status(StatusCodes.CREATED).json({ document });
  } else {
    res.status(400);
    throw new BadRequestError("Invalid Document data");
  }
};

const getAllDocuments = async (req, res) => {
  const documents = await DocumentSchema.find({});
  if (documents) {
    res.status(201).json(documents);
  } else {
    res.status(200).json({msg:"Something went wrong it is not fetching the datas"})
  }
};

const getSingleDocument = async (req, res) => {
  const id = req.params.id;
  try {
    const document = await DocumentSchema.findById(id);
    if (!document) {
      throw new BadRequestError(`there is no Document with id ${id}`);
    }
    res.status(201).json(document);
  } catch (error) {
    console.log(error);
  }
};

const acceptDocument = async (req, res) => {
  const id = req.params.id;
  const document = await DocumentSchema.findById(id);
  const {
    _id,
    agentName,
    agentLogo,
    firstName,
    middleName,
    lastName,
    profilePicture,
    email,
    phoneNumber,
    address,
  } = document;
  document.status = "accepted";

  const generatePassword = (length = 12) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  };

  const password = generatePassword();
  console.log(password);
  sendNotificationEmail({
    email: email,
    subject: "Approval of your document",
    text: password,
  });
  const user = await UserSchema.create({
    firstName,
    middleName,
    lastName,
    profilePicture,
    email,
    phoneNumber,
    password,
    role: "agent",
  });
  await user.save();

  const agent = await AgentSchema.create({
    documentId: _id,
    userId: user._id,
    agentName,
    agentLogo,
    firstName,
    middleName,
    lastName,
    profilePicture,
    email,
    phoneNumber,
    address,
  });
  await agent.save();
  await document.save();
  res.status(StatusCodes.OK).json({ document });
};

const rejectDocument = async (req, res) => {
  const { id: documentId } = req.params;

  const { subject, text } = req.body;
  const document = await DocumentSchema.findByIdAndDelete({ _id: documentId });
  const { email } = document;
  console.log(email);
  if (!document) {
    throw new NotFoundError(`No document with id : ${documentId}`);
  }
  sendNotificationEmail({ email, subject, text });
  // await document.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! application rejected." });
};
const uploadFile = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const uploadFile = req.files.file;

  const allowedFileTypes = ["image", "application/pdf", "application/msword"];

  if (!allowedFileTypes.includes(uploadFile.mimetype)) {
    throw new CustomError.BadRequestError("Invalid File Type");
  }
  const maxSize = 1024 * 1024;

  if (uploadFile.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload file smaller than 1MB"
    );
  }
  const sanitizedFileName = uploadFile.name.replace(/\s+/g, "-");
  const currentDate = new Date();
  const datePrefix = currentDate.toISOString().replace(/:/g, "-").slice(0, 19);
  const prefixedFileName = `${datePrefix}-${sanitizedFileName}`;

  const filePath = path.join(
    __dirname,
    "../public/files/" + `${prefixedFileName}`
  );
  await uploadFile.mv(filePath);
  res.status(StatusCodes.OK).json({ image: `${prefixedFileName}` });
};

module.exports = {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  acceptDocument,
  rejectDocument,
  uploadFile,
};
