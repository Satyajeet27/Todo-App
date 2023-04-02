const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.DATABASE);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("database is not connected");
  }
};

module.exports = connectDB;
