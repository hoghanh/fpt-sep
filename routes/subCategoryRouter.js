// import controllers review, products
const subCategoryController = require("../controllers/subCategoryController");

// router
const router = require("express").Router();

// use routers
router.post("/create", subCategoryController.createSubCategory);
router.route("/all").get(subCategoryController.getAllSubCategory);

router
   .route("/:subCategoryID")
   .get(subCategoryController.getSubCategoryById)
   .post(subCategoryController.updateSubCategory);

router
   .route("/category/:subCategoryID")
   .get(subCategoryController.getSubCategoryWithCategory);

module.exports = router;
