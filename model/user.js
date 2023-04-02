const { Schema, model } = require("mongoose");
const { createHmac } = require("crypto");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  const password = this.password;
  const salt = process.env.SALT;
  if (!user.isModified) return;
  const hashPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  this.password = hashPassword;
  next();
});

userSchema.static("passwordVerification", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return;
  const userDbPassword = user.password;
  const salt = process.env.SALT;
  const hashPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (userDbPassword !== hashPassword) return;
  return user;
});

const USER = model("user", userSchema);

module.exports = USER;
