'use strict';
module.exports = (sequelize, DataTypes) => {
  const teamStatistics = sequelize.define('teamStatistics', {
    procentWinner: DataTypes.INTEGER,
    pac: DataTypes.INTEGER,
    sho: DataTypes.INTEGER,
    pas: DataTypes.INTEGER,
    dri: DataTypes.INTEGER,
    def: DataTypes.INTEGER,
    phy: DataTypes.INTEGER
  });
  teamStatistics.associate = (models) => {
      teamStatistics.belongsTo(models.teams, {
          foreignKey: 'teamID',
          onDelete: 'CASCADE',
      });
  };
  return teamStatistics;
};