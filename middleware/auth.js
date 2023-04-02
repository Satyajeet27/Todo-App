const { getUser } = require("../service/auth");

function isUserLoggedIn() {
  return (req, resp, next) => {
    req.user = null;

    const token = req.cookies["token"];
    // console.log(token);
    if (!token) return next();
    try {
      const user = getUser(token);
    //   console.log(user);
      req.user = user;
    } catch {}
    next();
  };
}
module.exports = isUserLoggedIn;
