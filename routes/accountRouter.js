const { checkToken } = require("../auth/token_validation");

// import controllers review, products
const accountController = require("../controllers/accountController");

// router
const router = require("express").Router();

// use routers
router.post("/create", accountController.createAccount);
router.route("/login").post(accountController.login);
router.route("/").get(checkToken, accountController.getAllAccount);

router
   .route("/:accountID")
   .get(accountController.getAccountById)
   .post(accountController.updateAccount);

module.exports = router;
