// import controllers review, products
const jobController = require("../controllers/jobController");

// router
const router = require("express").Router();

// use routers
router.post("/create", jobController.createJob);
router.route("/all").get(jobController.getAllJob);
router.route("/page").post(jobController.paginationJob);

router
   .route("/:jobID")
   .get(jobController.getJobById)
   .post(jobController.updateJob);

router.route("/client/:jobID").get(jobController.getJobWithClientId);

router.route("/favorite/:jobID").get(jobController.addFavoriteJob);

module.exports = router;
