require("dotenv").config();
const express = require("express");
const connectDB = require("./conn");
const path = require("path");
const userListRouter = require("./routes/userList");
const { urlencoded } = require("express");
const router = require("./routes/loginSignup");
const cookieParser = require("cookie-parser");
const isUserLoggedIn = require("./middleware/auth");
const Item = require("./model/userList");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

app.use(isUserLoggedIn());
app.use("/todo", userListRouter);
app.use("/", router);

app.get("/", async (req, resp) => {
  //   console.log(req.user);
  if (!req.user) return resp.redirect("/login");
  const userItem = await Item.find({ createdBy: req.user._id });
  return resp.render("home", { user: req.user, items: userItem });
});

app.listen(PORT, () =>
  console.log(`successfully connected to localhost:${PORT}`)
);
