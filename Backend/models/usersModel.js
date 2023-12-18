const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const roles = ["user", "admin", "manager", "agent", "screener"];
const UserSchema = new mongoose.Schema(
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
      required: [true, "please provide the email"],
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
    password: {
      type: String,
      minlength: [6, "password must be minimum length of 6"],
      required: [true, "please provide the password"],
    },
    
    profilePicture: {
      type: String,
      required: [true, "please provide the profile picture"],
    },
    role: {
      type: String,
      enum: {
        values: roles,
        message: "Invalid role. Choose from: " + roles.join(", "),
      },
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, email: this.email, role:this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("UserSchema", UserSchema);
