module.exports = (sequelize, DataTypes) => {
   const Category = sequelize.define("category", {
      name: {
         type: DataTypes.STRING,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });

   return Category;
};
