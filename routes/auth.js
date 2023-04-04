const { Router } = require("express");
const USER = require("../model/user");
const { setUser } = require("../service/auth");
const {
  handleGetLoginRequest,
  handlePostLoginRequest,
  handleGetSignUpRequest,
  handlePostSignUpRequest,
  handleLogoutrequest,
} = require("../controller/auth");

const router = Router();

router.route("/login").get(handleGetLoginRequest).post(handlePostLoginRequest);

router
  .route("/signup")
  .get(handleGetSignUpRequest)
  .post(handlePostSignUpRequest);

router.get("/logout", handleLogoutrequest);
module.exports = router;
