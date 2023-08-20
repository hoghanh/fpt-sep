module.exports = (sequelize, DataTypes) => {
   const Account = sequelize.define("account", {
      name: {
         type: DataTypes.STRING,
      },
      phone: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      address: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      role: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      currency: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      status: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
   });

   return Account;
};
