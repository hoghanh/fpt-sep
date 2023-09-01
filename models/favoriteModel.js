module.exports = (sequelize, DataTypes) => {
   const Favorite = sequelize.define("favorite", {
      favoriteId: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
   });

   return Favorite;
};
