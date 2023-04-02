const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const setUser = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
};

const getUser = (token) => {
  const user = jwt.verify(token, secretKey);
  //   console.log("getUser", user);
  return user;
};

module.exports = {
  setUser,
  getUser,
};
