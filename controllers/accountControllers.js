const Account = require("../models/Account");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { json } = require("express");
exports.getAllAccounts = async (req, res, next) => {
   try {
      const [accounts, _] = await Account.findAll();

      res.status(200).json({ accounts });
   } catch (error) {
      next(error);
   }
};

exports.createAccount = async (req, res, next) => {
   try {
      let {
         name,
         phone,
         email,
         address,
         image,
         password,
         roleID,
         currency,
         status,
      } = req.body;
      const salt = genSaltSync(10);
      let account = new Account(
         name,
         phone,
         email,
         address,
         image,
         password,
         roleID,
         currency,
         status
      );
      account.password = hashSync(req.body.password, salt);
      console.log(account);
      account = await account.save();
      res.status(201).json({ message: "Account created" });
   } catch (error) {
      next(error);
   }
};

exports.updateAccount = async (req, res, next) => {
   try {
      let accountID = req.params.accountID;
      let {
         name,
         phone,
         email,
         address,
         image,
         password,
         roleID,
         currency,
         status,
      } = req.body;

      let account = new Account(
         name,
         phone,
         email,
         address,
         image,
         password,
         roleID,
         currency,
         status
      );
      const salt = genSaltSync(10);
      account.password = hashSync(req.body.password, salt);

      await Account.updateById(accountID, account);

      res.status(200).json({ message: "account updated" });
   } catch (error) {
      next(error);
   }
};

exports.getAccountById = async (req, res, netxt) => {
   try {
      let accountID = req.params.accountID;
      let [account, _] = await Account.findById(accountID);
      res.status(200).json({ account: account[0] });
   } catch (error) {
      next(error);
   }
};

exports.deleteJobById = async (req, res, next) => {
   try {
      let accountID = req.params.accountID;
      await Account.deleteById(accountID);
      res.status(200).json({ message: "account deleted" });
   } catch (error) {
      next(error);
   }
};

exports.login = async (req, res, next) => {
   try {
      await Account.findByEmail(req.body.email).then((result) => {
         console.log(result[0]);

         if (!result) {
            return res.json({
               message: "invalid Email",
            });
         }
         console.log(req.body.password);

         const checkPassword = compareSync(
            req.body.password,
            result[0][0].password
         );
         if (checkPassword) {
            const jsontoken = sign({ result: result[0] }, process.env.JWT_KEY, {
               expiresIn: "1h",
            });
            res.status(201).json({
               success: 1,
               message: "login successfully",
               token: jsontoken,
            });
         } else {
            res.status(403).json({
               message: "login fail",
            });
         }
      });
   } catch (error) {
      next(error);
   }
};
