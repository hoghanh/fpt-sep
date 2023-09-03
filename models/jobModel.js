module.exports = (sequelize, DataTypes) => {
   const Job = sequelize.define("job", {
      title: {
         type: DataTypes.STRING,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      fileAttachment: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      proposalSubmitDeadline: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      lowestIncome: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      highestIncome: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      skillSets: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      status: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
   });

   return Job;
};
