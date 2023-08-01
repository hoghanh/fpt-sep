const db = require("../config/db");

class Job {
   constructor(
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
   ) {
      this.title = title;
      this.description = description;
      this.duration = duration;
      this.scope = scope;
      this.createDate = createDate;
      this.updateDate = updateDate;
      this.endDate = endDate;
      this.fee = fee;
      this.clientID = clientID;
      this.status = status;
   }

   save() {
      let sql = `INSERT INTO job
      (
      title,
      description,
      duration,
      scope,
      createDate,
      updateDate,
      endDate,
      fee,
      clientID,
      status)
      VALUES
      (
         ?,
         ?,
         ?,
         ?,
         ?,
         ?,
         ?,
         ?,
         ?,
         ?);
    `;
      console.log(this.title);
      return db.execute(sql, [
         this.title,
         this.description,
         this.duration,
         this.scope,
         this.createDate,
         this.updateDate,
         this.endDate,
         this.fee,
         this.clientID,
         this.status,
      ]);
   }

   static findAll() {
      let sql = "SELECT * FROM job;";

      return db.execute(sql);
   }

   static findById(id) {
      let sql = `SELECT * FROM job WHERE jobID = ?;`;

      return db.query(sql, [id]);
   }

   static updateById(jobId, job) {
      let sql = `UPDATE job SET 
      title = ?,
      description = ?,
      duration = ?,
      scope = ?,
      updateDate = ?,
      endDate = ?,
      fee = ?,
      status = ?
      WHERE jobID = ?;`;

      return db.query(sql, [
         job.title,
         job.description,
         job.duration,
         job.scope,
         job.updateDate,
         job.endDate,
         job.fee,
         job.status,
         jobId,
      ]);
   }

   static deleteById(jobId) {
      let sql = `UPDATE job SET 
      status = false,
      WHERE jobID = ?;`;
      return db.query(sql, jobId);
   }
}

module.exports = Job;
