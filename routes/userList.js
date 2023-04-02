const { Router } = require("express");
const Item = require("../model/userList");

const router = Router();

router.post("/", async (req, resp) => {
  console.log(req.body);
  const userItem = {
    userItem: req.body.userItem,
    createdBy: req.user._id,
  };
  await Item.create(userItem);
  const result = await Item.find({ createdBy: req.user._id });
  console.log(result);
  return resp.render("home", { user: req.user, items: result });
});

router.get("/", async (req, resp) => {
  if (!req.user) return resp.redirect("/login");
  // console.log(req.user);
  const result = await Item.find({ createdBy: req.user._id });
  //   console.log(result);

  return resp.render("home", {
    user: req.user,
    items: result,
  });
});
router.post("/delete", async (req, resp) => {
  if (!req.body.checkbox) return resp.redirect("/");
  await Item.findByIdAndDelete({ _id: req.body.checkbox });
  return resp.redirect("/");
});

module.exports = router;
