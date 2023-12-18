const mongoose = require("mongoose");

const connectDB = (url) => {
  console.log(url);
  return mongoose
    .connect(url)
    .then(() => console.log(`connected to DB...`))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
