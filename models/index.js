const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
   host: dbConfig.HOST,
   dialect: dbConfig.dialect,
   operatorsAliases: false,

   pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
   },
});

sequelize
   .authenticate()
   .then(() => {
      console.log("connected..");
   })
   .catch((err) => {
      console.log("Error" + err);
   });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// model

db.accounts = require("./accountModel")(sequelize, DataTypes);
db.categorys = require("./categoryModel")(sequelize, DataTypes);
db.subCategorys = require("./subCategoryModel")(sequelize, DataTypes);
db.jobs = require("./jobModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
   console.log("yes re-sync done!");
});

// 1 to Many Relation
// category_subcategory
db.categorys.hasMany(db.subCategorys, {
   foreignKey: "category_id",
   as: "subCategorys",
});

db.subCategorys.belongsTo(db.categorys, {
   foreignKey: "category_id",
   as: "categorys",
});

// job_client
db.accounts.hasMany(db.jobs, {
   foreignKey: "client_id",
   as: "jobs",
});

db.jobs.belongsTo(db.accounts, {
   foreignKey: "client_id",
   as: "accounts",
});

// Many to Many relation
db.jobs.belongsToMany(db.accounts, { through: "favorite" });
db.accounts.belongsToMany(db.jobs, { through: "favorite" });
module.exports = db;
