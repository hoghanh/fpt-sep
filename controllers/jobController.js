const db = require("../models");
// image Upload

// create main Model
const Job = db.jobs;
const Account = db.accounts;

// main work

// 1. create Job

const createJob = async (req, res) => {
   try {
      let info = {
         title: req.body.name,
         description: req.body.description,
         duration: req.body.duration,
         scope: req.body.scope,
         endDate: req.body.endDate,
         fee: req.body.fee,
         status: req.body.status ? req.body.status : false,
      };

      const Job = await Job.create(info);
      res.status(200).send(Job);
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

module.exports = {
   createJob,
   getJobById,
   getAllJob,
   updateJob,
   getJobWithClientId,
};
