'use strict';
module.exports = (sequelize, DataTypes) => {
  const playerStatistics = sequelize.define('playerStatistics', {
    pac: DataTypes.INTEGER,
    sho: DataTypes.INTEGER,
    pas: DataTypes.INTEGER,
    dri: DataTypes.INTEGER,
    def: DataTypes.INTEGER,
    phy: DataTypes.INTEGER
  });
  playerStatistics.associate = (models) => {
      playerStatistics.belongsTo(models.players, {
          foreignKey: 'playerID',
          onDelete: 'CASCADE',
      });
  };
  return playerStatistics;
};