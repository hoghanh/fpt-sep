module.exports = (sequelize, DataTypes) => {
   const Freelancer = sequelize.define("freelancer", {
      status: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      cvFile: {
         type: DataTypes.STRING,
      },
      hoursPerWeek: {
         type: DataTypes.STRING,
      },
      languages: {
         type: DataTypes.STRING,
      },
      education: {
         type: DataTypes.STRING,
      },
      introduction: {
         type: DataTypes.STRING,
      },
      title: {
         type: DataTypes.STRING,
      },
   });

   return Freelancer;
};
