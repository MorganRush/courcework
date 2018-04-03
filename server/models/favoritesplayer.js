'use strict';
module.exports = (sequelize, DataTypes) => {
  const favoritesPlayer = sequelize.define('favoritesPlayer', {});
  favoritesPlayer.associate = (models) => {
      favoritesPlayer.belongsTo(models.players, {
          foreignKey: 'playerID',
          onDelete: 'CASCADE',
      });
      favoritesPlayer.belongsTo(models.users, {
          foreignKey: 'userID',
          onDelete: 'CASCADE',
      });
  };
  return favoritesPlayer;
};