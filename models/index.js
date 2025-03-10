const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes, Op } = require("sequelize");

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

db.Op = Op;

// model

db.accounts = require("./accountModel")(sequelize, DataTypes);
db.categorys = require("./categoryModel")(sequelize, DataTypes);
db.subCategorys = require("./subCategoryModel")(sequelize, DataTypes);
db.jobs = require("./jobModel")(sequelize, DataTypes);
db.clients = require("./clientModel")(sequelize, DataTypes);
db.freelancers = require("./freelancerModel")(sequelize, DataTypes);

// many many table

db.jobSubcategory = require("./jobSubcategoryModel")(sequelize, DataTypes);
db.favorite = require("./favoriteModel")(sequelize, DataTypes);
// creation

db.sequelize.sync({ force: false, alter: true }).then(() => {
   console.log("re-sync done!");
});

// 1 to Many Relation
// category_subcategory
db.categorys.hasMany(db.subCategorys, {
   foreignKey: "categoryId",
   as: "subCategorys",
});

db.subCategorys.belongsTo(db.categorys, {
   foreignKey: "categoryId",
   as: "categorys",
});

// account_client
db.accounts.hasOne(db.clients, {
   foreignKey: "accountId",
   as: "clients",
});

db.clients.belongsTo(db.accounts, {
   foreignKey: "accountId",
   as: "accounts",
});

// account_freelancer
db.accounts.hasOne(db.freelancers, {
   foreignKey: "accountId",
   as: "freelancers",
});

db.freelancers.belongsTo(db.accounts, {
   foreignKey: "accountId",
   as: "accounts",
});

// job_client
db.clients.hasMany(db.jobs, {
   foreignKey: "clientId",
   as: "jobs",
});

db.jobs.belongsTo(db.clients, {
   foreignKey: "clientId",
   as: "clients",
});

// Many to Many relation
db.jobs.belongsToMany(db.accounts, { through: db.favorite });
db.accounts.belongsToMany(db.jobs, { through: db.favorite });

db.jobs.belongsToMany(db.subCategorys, { through: db.jobSubcategory });
db.subCategorys.belongsToMany(db.jobs, { through: db.jobSubcategory });

module.exports = db;
