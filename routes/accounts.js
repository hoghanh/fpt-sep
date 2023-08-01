const express = require("express");
const router = express.Router();
const accountControllers = require("../controllers/accountControllers");
const { checkToken } = require("../auth/token_validation");
// @route GET && POST - /posts/
router
   .route("/")
   .get(checkToken, accountControllers.getAllAccounts)
   .post(accountControllers.createAccount);

router.route("/login").post(accountControllers.login);
router
   .route("/:accountID")
   .get(accountControllers.getAccountById)
   .post(accountControllers.updateAccount);
module.exports = router;
