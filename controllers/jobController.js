const db = require("../models");

// image Upload

// create main Model
const Job = db.jobs;
const Account = db.accounts;
const Category = db.categorys;

// main work

// 1. create Job

const createJob = async (req, res) => {
   try {
      let info = {
         title: req.body.title,
         description: req.body.description,
         duration: req.body.duration,
         scope: req.body.scope,
         endDate: req.body.endDate,
         fee: req.body.fee,
         status: req.body.status ? req.body.status : false,
      };

      const job = await Job.create(info);
      res.status(200).send(job);
      console.log(Job);
   } catch (error) {
      console.log(error);
   }
};

// 2. get all Job
const getAllJob = async (req, res) => {
   try {
      let jobs = await Job.findAll({});
      res.status(200).send(jobs);
   } catch (error) {
      console.log(error);
   }
};

const getJobById = async (req, res) => {
   try {
      let job = await Job.findOne({
         where: { id: req.params.jobID },
      });
      res.status(200).send(job);
   } catch (error) {
      console.log(error);
   }
};

const updateJob = async (req, res) => {
   try {
      let job = await Job.update(req.body, {
         where: { id: req.params.jobID },
      });
      res.status(200).send(job);
   } catch (error) {
      console.log(error);
   }
};

// 7. connect one to many relation

const getJobWithClientId = async (req, res) => {
   const data = await Job.findOne({
      include: [
         {
            model: Account,
            as: "accounts",
         },
      ],
      where: { id: req.params.jobID },
   });

   res.status(200).send(data);
};

// Add job to favorite
const addFavoriteJob = async (req, res) => {
   const job = await Job.findOne({
      where: { id: req.params.jobID },
   });
   const account = await Account.findOne({
      where: { id: req.body.accountId },
   });
   job.addAccount(account);

   res.status(200).send(job);
};

// get job pagination
const paginationJob = async (req, res) => {
   let limit = req.body.limit ? req.body.limit : 10;
   req.body.page = req.body.page ? req.body.page : 1;
   let offset = 0 + (req.body.page - 1) * limit;
   const job = await Job.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["updatedAt", "ASC"]],
   });

   res.status(200).send(job);
};

// get job by category
const getJobByCategory = async (req, res) => {
   const data = await Job.findAll({
      include: [
         {
            model: Category,
            as: "categorys",
            where: {
               name: {
                  [db.Op.like]: `%${req.body.categoryName}`,
               },
            },
         },
      ],
   });

   res.status(200).send(data);
};

module.exports = {
   createJob,
   getJobById,
   getAllJob,
   updateJob,
   getJobWithClientId,
   addFavoriteJob,
   paginationJob,
   getJobByCategory,
};
