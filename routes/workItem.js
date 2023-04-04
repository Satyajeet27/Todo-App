const { Router } = require("express");
const {
  handlePostWorkItemRequest,
  handleGetWorkItemRequest,
  handleDeleteWorkItemRequest,
  handleGetWorkItemUpdateRequest,
  handlePostWorkItemUpdateRequest,
} = require("../controller/workItem");

const router = Router();

router.post("/", handlePostWorkItemRequest);

router.get("/", handleGetWorkItemRequest);
router.post("/delete", handleDeleteWorkItemRequest);
router
  .route("/update")
  .get(handleGetWorkItemUpdateRequest)
  .post(handlePostWorkItemUpdateRequest);

module.exports = router;
