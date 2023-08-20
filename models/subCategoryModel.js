module.exports = (sequelize, DataTypes) => {
   const SubCategory = sequelize.define("subcategory", {
      name: {
         type: DataTypes.STRING,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   });

   return SubCategory;
};
