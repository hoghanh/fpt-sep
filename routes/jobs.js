const express = require("express");
const router = express.Router();
const jobControllers = require("../controllers/jobControllers");

// @route GET && POST - /posts/
router
   .route("/")
   .get(jobControllers.getAllJobs)
   .post(jobControllers.createNewJob);

router
   .route("/:jobId")
   .get(jobControllers.getJobById)
   .put(jobControllers.updateJobById);

router.route("/delete/:jobId").get(jobControllers.deleteJobById);

module.exports = router;
