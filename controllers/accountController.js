const db = require("../models");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
// image Upload

// create main Model
const Account = db.accounts;
const Job = db.jobs;
const Freelancer = db.freelancers;
const Client = db.clients;
// main work

// 1. register account
const register = async (req, res) => {
   try {
      let info = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         role: "client",
         currency: 0,
         status: true,
      };
      // check dulicate
      if (
         (checkEmailDulicate = await Account.findOne({
            where: { email: req.body.email },
         }))
      ) {
         throw new Error("Email has already used");
      }

      // decode password
      const salt = genSaltSync(10);
      info.password = hashSync(req.body.password, salt);

      // create account
      const account = await Account.create(info);
      res.status(200).json({ message: "Account created" });

      console.log(account.dataValues);
   } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.toString() });
   }
};

// 2. get all account
const getAllAccount = async (req, res) => {
   try {
      let accounts = await Account.findAll({});
      res.status(200).send(accounts);
   } catch (error) {
      console.log(error);
   }
};

const getAccountById = async (req, res) => {
   try {
      let accounts = await Account.findOne({
         where: { id: req.params.accountID },
      });
      res.status(200).send(accounts);
   } catch (error) {
      console.log(error);
   }
};

const updateAccount = async (req, res) => {
   try {
      let accounts = await Account.update(req.body, {
         where: { id: req.params.accountID },
      });
      res.status(200).send(accounts);
   } catch (error) {
      console.log(error);
   }
};

const login = async (req, res) => {
   try {
      const account = await Account.findOne({
         attributes: { exclude: ["createdAt", "updatedAt"] },
         where: { email: req.body.email },
      });
      console.log(account);

      if (!account) {
         return res.json({
            message: "invalid Email",
         });
      }

      const checkPassword = compareSync(req.body.password, account.password);
      if (checkPassword) {
         const jsontoken = sign({ result: account }, process.env.JWT_KEY, {
            expiresIn: "1h",
         });
         res.status(201).json({
            success: 1,
            message: "login successfully",
            token: jsontoken,
            account: account,
         });
      } else {
         res.status(403).json({
            message: "login fail",
         });
      }
   } catch (error) {
      console.log(error);
   }
};

const getAccountWithJobId = async (req, res) => {
   const data = await Account.findAll({
      include: [
         {
            model: Job,
            as: "jobs",
         },
      ],
      where: { id: req.params.accountID },
   });

   res.status(200).send(data);
};
module.exports = {
   register,
   getAccountById,
   getAllAccount,
   updateAccount,
   getAccountWithJobId,
   login,
};
