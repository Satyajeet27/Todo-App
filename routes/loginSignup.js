const { Router } = require("express");
const USER = require("../model/user");
const { setUser } = require("../service/auth");

const router = Router();

router
  .route("/login")
  .get((req, resp) => {
    if (req.user) return resp.redirect("/");
    return resp.render("login");
  })
  .post(async (req, resp) => {
    const { email, password } = req.body;
    // console.log(req.body);
    const result = await USER.passwordVerification(email, password);
    // console.log("test", result);
    if (!result)
      return resp.render("login", { error: "Invalid email or password" });
    const user = {
      _id: result._id,
      username: result.username,
      email: result.email,
    };
    const token = setUser(user);

    // const result = await USER.findOne({
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    if (!result)
      return resp.render("login", { error: "Invalid email or password" });
    // console.log(result);

    return resp.cookie("token", token).redirect("/");
  });
router
  .route("/signup")
  .get((req, resp) => {
    // USER.create()
    resp.render("signup");
  })
  .post(async (req, resp) => {
    try {
      await USER.create(req.body);
      return resp.render("signup", { success: "Account has been created" });
    } catch (e) {
      //   return resp.send(e);
      if (e.code === 11000) {
        return resp.render("signup", { error: "email already exist" });
      } else if (e.errors.password) {
        return resp.render("signup", { error: e.errors.password.message });
      }
      //   console.log("error in user creation:", e);
      //   return resp.send(e.errors);
    }
  });

router.get("/logout", (req, resp) => {
  resp.clearCookie("token").redirect("/login");
});
module.exports = router;
