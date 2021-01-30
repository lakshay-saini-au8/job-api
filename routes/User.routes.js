const express = require("express");
const { applyJob } = require("../controller/User.controller");
const { protect } = require("../middleware/Auth.middleware");
const router = express.Router();

/* 
@desc to get the user details using id
@route GET /
*/

router.post("/apply/:jobId", protect, applyJob);
module.exports = router;
