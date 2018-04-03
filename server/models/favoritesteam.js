'use strict';
module.exports = (sequelize, DataTypes) => {
  const favoritesTeam = sequelize.define('favoritesTeam', {});
  favoritesTeam.associate = (models) => {
      favoritesTeam.belongsTo(models.teams, {
          foreignKey: 'teamID',
          onDelete: 'CASCADE',
      });
      favoritesTeam.belongsTo(models.users, {
          foreignKey: 'userID',
          onDelete: 'CASCADE',
      });
  };
  return favoritesTeam;
};