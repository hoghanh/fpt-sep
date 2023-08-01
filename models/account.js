const db = require("../config/db");

class Account {
   constructor(
      name,
      phone,
      email,
      address,
      image,
      password,
      roleID,
      currency,
      status
   ) {
      this.name = name;
      this.phone = phone;
      this.email = email;
      this.address = address;
      this.image = image;
      this.password = password;
      this.roleID = roleID;
      this.currency = currency;
      this.status = status;
   }

   save() {
      let sql = `INSERT INTO account
      (
      name,
      phone,
      email,
      address,
      image,
      password,
      roleID,
      currency,
      status)
      VALUES
      (?,?,?,?,?,?,?,?,?);
      `;
      console.log(sql);
      let test = db.execute(sql, [
         this.name,
         this.phone,
         this.email,
         this.address,
         this.image,
         this.password,
         this.roleID,
         this.currency,
         this.status,
      ]);
      console.log(test);
      return test;
   }

   static findAll() {
      let sql = "SELECT * FROM account WHERE status = 1;";

      return db.execute(sql);
   }

   static findById(accountID) {
      let sql = `SELECT * FROM account WHERE accountID = ? AND status = 1;`;
      return db.query(sql, [accountID]);
   }

   static findByEmail(email) {
      let sql = `SELECT * FROM account WHERE email = ?;`;
      return db.query(sql, [email]);
   }

   static updateById(accountID, account) {
      console.log(accountID);
      console.log(account);
      let sql = `UPDATE account
      SET
      name = ?,
      phone = ?,
      address = ?,
      image = ?,
      password =?
      WHERE accountID = ?
      AND status = true;
      `;
      return db.query(sql, [
         account.name,
         account.phone,
         account.address,
         account.image,
         account.password,
         accountID,
      ]);
   }

   static deleteById(accountID) {
      let sql = `UPDATE account
      SET
      status = 0,
      WHERE accountID = ?;
      `;
      return db.query(sql, accountID);
   }
}

module.exports = Account;
