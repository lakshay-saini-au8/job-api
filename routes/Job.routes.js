const express = require("express");
const { addJob, activeJob } = require("../controller/Job.controller");
const router = express.Router();
const { protect } = require("../middleware/Auth.middleware");
router.route("/add").post(addJob);
router.route("/active").get(activeJob);

module.exports = router;
