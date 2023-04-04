require("dotenv").config();
const express = require("express");
const connectDB = require("./conn");
const path = require("path");
const userListRouter = require("./routes/workItem");
const { urlencoded } = require("express");
const accessRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const isUserLoggedIn = require("./middleware/auth");
const WORKITEM = require("./model/workItem");
const USER = require("./model/user");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.use(isUserLoggedIn());

app.use("/", accessRouter);
app.use("/todo", userListRouter);
app.get("/", async (req, resp) => {
  //   console.log(req.user);
  if (!req.user) return resp.redirect("/login");
  const workItem = await WORKITEM.find({ createdBy: req.user._id });
  const checkUser = await USER.findOne({ _id: req.user._id });
  if (!checkUser) return resp.clearCookie("token").redirect("/login");
  // console.log(workItem);
  return resp.render("home", { user: req.user, items: workItem });
});

const startApp = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`successfully connected to localhost:${PORT}`);
    });
    // Clear cookie on server start
  } catch (error) {}
};

startApp();
