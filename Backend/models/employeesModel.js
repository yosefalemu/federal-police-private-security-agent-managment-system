const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please provide the first name"],
      minlength: [3, "name must be minimum length of 3"],
      maxlength: [50, "name must be maximum length of 50"],
    },
    middleName: {
      type: String,
      required: [true, "please provide the middle name"],
      minlength: [3, "name must be minimum length of 3"],
      maxlength: [50, "name must be maximum length of 50"],
    },
    lastName: {
      type: String,
      required: [true, "please provide the last name"],
      minlength: [3, "name must be minimum length of 3"],
      maxlength: [50, "name must be maximum length of 50"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide valid email",
      ],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "please provide the phone number"],
    },
    employeeId: {
      type: String,
      required: [true, "please provide the profile picture"],
      default: "",
    },
    profilePicture: {
      type: String,
      required: [true, "please provide the profile picture"],
      default: "",
    },
    cosignerId: {
      type: String,
      required: [true, "please provide the cosigner picture"],
      default: "",
    },
    agentId: {
      type: mongoose.Types.ObjectId,
      ref: "AgentSchema",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeSchema", EmployeeSchema);
