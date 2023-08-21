module.exports = (sequelize, DataTypes) => {
   const Freelancer = sequelize.define("freelancer", {
      status: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
   });

   return Freelancer;
};
