const Job = require("../models/Job");

exports.getAllJobs = async (req, res, next) => {
   try {
      const [jobs, _] = await Job.findAll();

      res.status(200).json({ jobs });
   } catch (error) {
      next(error);
   }
};

exports.createNewJob = async (req, res, next) => {
   try {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${day}-${month}-${year}`;
      let createDate = currentDate;
      let updateDate = currentDate;

      let {
         title,
         description,
         duration,
         scope,
         endDate,
         fee,
         clientID,
         status,
      } = req.body;

      let job = new Job(
         title,
         description,
         duration,
         scope,
         createDate,
         updateDate,
         endDate,
         fee,
         clientID,
         status
      );

      console.log(job);
      job = await job.save();
      res.status(201).json({ message: "Job created" });
   } catch (error) {
      next(error);
   }
};

exports.getJobById = async (req, res, next) => {
   try {
      let jobId = req.params.jobId;

      let [job, _] = await Job.findById(jobId);

      res.status(200).json({ job: job[0] });
   } catch (error) {
      next(error);
   }
};

exports.updateJobById = async (req, res, next) => {
   try {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.
      let updateDate = `${day}-${month}-${year}`;
      let jobId = req.params.jobId;

      let {
         title,
         description,
         duration,
         scope,
         createDate,
         endDate,
         fee,
         clientID,
         status,
      } = req.body;

      let updateJob = new Job(
         title,
         description,
         duration,
         scope,
         createDate,
         updateDate,
         endDate,
         fee,
         clientID,
         status
      );
      let a = await Job.updateById(jobId, updateJob);
      console.log(a);
      res.status(200).json({ message: "Job updated" });
   } catch (error) {
      next(error);
   }
};

exports.deleteJobById = async (req, res, next) => {
   try {
      let jobId = req.params.jobId;
      await Job.deleteById(jobId);
      res.status(200).json({ message: "Job delete" });
   } catch (error) {
      next(error);
   }
};
