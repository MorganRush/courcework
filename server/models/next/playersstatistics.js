'use strict';
module.exports = (sequelize, DataTypes) => {
  const playersStatistics = sequelize.define('playersStatistics', {
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
  playersStatistics.associate = (models) => {
      playersStatistics.hasOne(models.contracts, {
          foreignKey: 'playersStatisticsID',
          as: 'contracts'
      });
  };
  return playersStatistics;
};