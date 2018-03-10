'use strict';
module.exports = (sequelize, DataTypes) => {
  const players = sequelize.define('players', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      surname: {
          type: DataTypes.STRING,
          allowNull: false,
      }
  });
  players.associate = (models) => {
      players.hasMany(models.contracts, {
          foreignKey: 'playerID',
          as: 'contracts',
      });
  };
  return players;
};