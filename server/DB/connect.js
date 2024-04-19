const mongoose = require("mongoose");

const connectDB = async (url) => {
  return await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to Mongo!");
    })
    .catch((err) => {
      console.error("Error connecting to Mongo", err);
    });
};

module.exports = connectDB;