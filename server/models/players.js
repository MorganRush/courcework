'use strict';
module.exports = (sequelize, DataTypes) => {
  const players = sequelize.define('players', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });
  players.associate = (models) => {
      players.hasMany(models.contracts, {
          foreignKey: 'playerID',
          as: 'contracts',
      });
      players.hasMany(models.favoritesPlayer, {
          foreignKey: 'playerID',
          as: 'favoritesPlayer',
      });
      players.hasMany(models.commentsPlayers, {
          foreignKey: 'playerID',
          as: 'commentsPlayers',
      });
      // players.hasMany(models.playerStatistics, {
      //     foreignKey: 'playerID',
      //     as: 'playerStatistics',
      // });
  };
  return players;
};