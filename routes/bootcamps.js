const express = require("express");
const {
  getBootCamp,
  getBootCamps,
  createBootCamp,
  deleteBootCamp,
  updateBootCamps,
} = require("../controllers/bootcamps");

const router = express.Router();

router.route("/").get(getBootCamps).post(createBootCamp);
router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamps)
  .delete(deleteBootCamp);

module.exports = router;
