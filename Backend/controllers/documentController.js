const UserSchema = require("../models/usersModel");
const DocumentSchema = require("../models/documentModel");
const AgentSchema = require("../models/agentsModel");
const { BadRequestError, NotFoundError } = require("../errors");
const sendNotificationEmail = require("../mailServices/sendNotificationEmail");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const emailConfig = require("../mailServices/emailConfig");
const sendEmailRequestAccepted = require("../mailServices/sendEmailRequestAcceptance");
const sendEmailRequestDeclined = require("../mailServices/sendEmailRequestDeclined");

const createDocument = async (req, res) => {
  const { email, nationalId } = req.body;

  const documentExists = await DocumentSchema.findOne({
    $or: [{ email }, { nationalId }],
  });

  if (documentExists) {
    if (documentExists.email === email) {
      throw new BadRequestError("The email is already exist in the documents");
    } else if (documentExists.nationalId === nationalId) {
      throw new BadRequestError(
        "The national ID is already exist please use reapply"
      );
    }
  }

  const document = await DocumentSchema.create(req.body);

  if (document) {
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
    res
      .status(200)
      .json({ msg: "Something went wrong it is not fetching the datas" });
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

const getSingleDocumentByNationalId = async (req, res) => {
  const { nationalId } = req.params;
  const document = await DocumentSchema.findOne({ nationalId: nationalId });
  if (!document) {
    throw new BadRequestError(`there is no Document with id ${nationalId}`);
  }
  res.status(201).json(document);
};

const acceptDocument = async (req, res) => {
  const id = req.params.id;
  const { approvedBy, emailPass, senderEmail } = req.body;
  console.log("approved by", approvedBy);
  console.log("email pass", emailPass);
  const document = await DocumentSchema.findById(id);
  console.log("document", document);
  const {
    _id,
    agentName,
    agentLogo,
    agentUniform,
    firstName,
    middleName,
    lastName,
    nationalId,
    dateOfBirth,
    checkedBy,
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
  const senderTransporter = emailConfig(senderEmail, emailPass);
  sendEmailRequestAccepted({
    transporter: senderTransporter,
    email: email,
    subject: "Approval of your document",
    password: password,
    senderEmail: senderEmail,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
  });
  const user = await UserSchema.create({
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    nationalId,
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
    agentUniform,
    firstName,
    middleName,
    lastName,
    profilePicture,
    email,
    phoneNumber,
    address,
    checkedBy,
    approvedBy: approvedBy,
  });
  await agent.save();
  await document.save();
  res.status(StatusCodes.OK).json({ document });
};

const rejectDocument = async (req, res) => {
  const { documentId } = req.params;

  const subject = "Rejection of application";
  console.log("log in the rejection", req.body);
  const { text, newUpdate, senderEmail, emailPass } = req.body;
  const document = await DocumentSchema.findByIdAndUpdate(
    { _id: documentId },
    {
      status: "rejected",
      newUpdate: newUpdate,
    },
    { runValidators: true, new: true }
  );
  if (!document) {
    throw new NotFoundError(`No document with id : ${documentId}`);
  }
  const { email } = document;
  console.log("reciever email", email);
  const senderTransporter = emailConfig(senderEmail, emailPass);
  sendEmailRequestDeclined({
    transporter: senderTransporter,
    email,
    subject,
    text,
    senderEmail,
    firstName: document.firstName,
    middleName: document.middleName,
    lastName: document.lastName,
  });
  res.status(StatusCodes.OK).json(document);
};
const rejectDocumentByAdmin = async (req, res) => {
  const { documentId } = req.params;
  const document = await DocumentSchema.findByIdAndUpdate(
    { _id: documentId },
    {
      checked: false,
    },
    { runValidators: true, new: true }
  );
  if (!document) {
    throw new BadRequestError(`There is no document with id ${documentId}`);
  }
  res.status(StatusCodes.OK).json(document);
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
const checkDocument = async (req, res) => {
  const id = req.params.id;
  const updatedDocument = await DocumentSchema.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedDocument) {
    throw new BadRequestError(`No document with id ${id} to be updated`);
  }
  res.status(StatusCodes.OK).json({ updatedDocument });
};

const updatedDocumentByNationalId = async (req, res) => {
  const { nationalId } = req.params;
  console.log(req.body);
  const updatedDocument = await DocumentSchema.findOneAndUpdate(
    { nationalId: nationalId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedDocument) {
    throw new BadRequestError(
      `No document with id ${nationalId} to be updated`
    );
  }
  res.status(StatusCodes.OK).json({ updatedDocument });
};
const findUncheckedDocuments = async (req, res) => {
  const documents = await DocumentSchema.find({ checked: false });
  if (!documents) {
    throw new BadRequestError("No new request");
  }
  res.status(StatusCodes.OK).json({ documents: documents });
};
const findcheckedDocuments = async (req, res) => {
  const documents = await DocumentSchema.find({
    checked: true,
    status: "pending",
  });
  if (!documents) {
    throw new BadRequestError("No new request");
  }
  res.status(StatusCodes.OK).json({ documents: documents });
};

module.exports = {
  createDocument,
  getAllDocuments,
  getSingleDocument,
  getSingleDocumentByNationalId,
  acceptDocument,
  rejectDocument,
  rejectDocumentByAdmin,
  uploadFile,
  checkDocument,
  updatedDocumentByNationalId,
  findUncheckedDocuments,
  findcheckedDocuments,
};
