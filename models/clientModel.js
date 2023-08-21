module.exports = (sequelize, DataTypes) => {
   const Client = sequelize.define("client", {
      status: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
   });

   return Client;
};
