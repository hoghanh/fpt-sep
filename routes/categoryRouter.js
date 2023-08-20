// import controllers review, products
const categoryController = require("../controllers/categoryController");

// router
const router = require("express").Router();

// use routers
router.post("/create", categoryController.createCategory);
router.route("/all").get(categoryController.getAllCategory);

router
   .route("/:categoryID")
   .get(categoryController.getCategoryById)
   .post(categoryController.updateCategory);

router
   .route("/subCategory/:categoryID")
   .get(categoryController.getCategoryWithSubCategory);

module.exports = router;
