'use strict';
module.exports = (sequelize, DataTypes) => {
  const players = sequelize.define('players', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      reiting: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      pac: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      sho: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      pas: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      dri: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      def: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      phy: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      refImage: {
          type: DataTypes.STRING,
          allowNull: false,
      }
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