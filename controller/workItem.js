const WORKITEM = require("../model/workItem");

const handleGetWorkItemRequest = async (req, resp) => {
  if (!req.user) return resp.redirect("/login");
  // console.log(req.user);
  const result = await WORKITEM.find({ createdBy: req.user._id });
  //   console.log(result);

  return resp.redirect("/");
};
const handlePostWorkItemRequest = async (req, resp) => {
  const workItem = {
    workItem: req.body.workItem,
    createdBy: req.user._id,
  };
  await WORKITEM.create(workItem);
  //   const result = await WORKITEM.find({ createdBy: req.user._id });
  //   console.log(result);
  return resp.redirect("/");
};
const handleDeleteWorkItemRequest = async (req, resp) => {
  // console.log("delete", req.body);
  if (!req.body.checkbox) return resp.redirect("/");

  await WORKITEM.findByIdAndDelete({ _id: req.body.checkbox });
  return resp.redirect("/");
};

const handleGetWorkItemUpdateRequest = async (req, resp) => {
  if (!req.user) return resp.redirect("/login");
  // console.log("update:", req.query);
  const workItem = await WORKITEM.findOne({
    createdBy: req.user._id,
    _id: req.query._id,
  });
  // console.log(workItem);
  return resp.render("itemUpdate", { user: req.user, items: workItem });
};

const handlePostWorkItemUpdateRequest = async (req, resp) => {
  if (!req.user) return resp.redirect("/login");
  const test = req.body;
  const workItem = await WORKITEM.findByIdAndUpdate(
    { _id: req.body.checkbox },
    { $set: { isCompleted: true } }
  );
  resp.redirect("/");
};
module.exports = {
  handleDeleteWorkItemRequest,
  handleGetWorkItemRequest,
  handlePostWorkItemRequest,
  handleGetWorkItemUpdateRequest,
  handlePostWorkItemUpdateRequest,
};
