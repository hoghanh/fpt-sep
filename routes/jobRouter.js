// import controllers review, products
const jobController = require("../controllers/jobController");

// router
const router = require("express").Router();

// use routers
router.post("/create", jobController.createJob);

router.route("/all").get(jobController.getAllJob);
router.route("/page/limit=:limit&page=:page").get(jobController.paginationJob);
router.route("/category").get(jobController.getJobByCategory);

router.route("/client/:jobID").get(jobController.getJobWithClientId);

router.route("/favorite/:jobID").get(jobController.addFavoriteJob);
router
   .route("/detail/:jobID")
   .get(jobController.getJobById)
   .post(jobController.updateJob);
module.exports = router;
