module.exports = (sequelize, DataTypes) => {
   const Job = sequelize.define("job", {
      title: {
         type: DataTypes.STRING,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      duration: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      scope: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      endDate: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      fee: {
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
