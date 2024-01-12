const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema(
  {
    agentName: {
      type: String,
      required: [true, "please provide the name"],
      minlength: [3, "name must be minimum length of 3"],
      maxlength: [50, "name must be maximum length of 50"],
      unique: true,
    },

    agentLogo: {
      type: String,
      required: [true, "please provide the profile picture"],
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
    profilePicture: {
      type: String,
      required: [true, "please provide the profile picture"],
    },
    agentUniform: {
      type: String,
      required: [true, "please provide the agent agentUniform"],
    },
    documentId: {
      type: mongoose.Types.ObjectId,
      ref: "DocumentSchema",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgentSchema", AgentSchema);
