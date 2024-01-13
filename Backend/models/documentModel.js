const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    agentName: {
      type: String,
      required: [true, "please provide the name"],
      minlength: [3, "name must be minimum length of 3"],
      maxlength: [50, "name must be maximum length of 50"],
    },
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
    dateOfBirth: {
      type: String,
      required: [true, "please provide date of birth"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide valid email",
      ],
      unique: true,
    },
    nationalId: {
      type: String,
      required: [true, "please provide national id"],
    },
    phoneNumber: {
      type: String,
      required: [true, "please provide the phone number"],
    },
    address: {
      city: {
        type: String,
        required: [true, "please provide city name"],
      },
      woreda: {
        type: String,
        required: [true, "please provide woreda"],
      },
      kebele: {
        type: String,
        required: [true, "please provide kebele"],
      },
      houseNumber: {
        type: String,
        required: [true, "please provide house number"],
      },
    },
    agentLogo: {
      type: String,
      required: [true, "please provide the agent logo"],
    },
    agentFile: {
      type: String,
      required: [true, "upload all files scanned and merged"],
    },
    ownerFile: {
      type: String,
      required: [true, "please provide all the scanned and merged files"],
    },

    profilePicture: {
      type: String,
      required: [true, "please provide the profile picture"],
    },
    agentUniform: {
      type: String,
      required: [true, "please provide the agent uniform"],
    },
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DocumentSchema", DocumentSchema);
