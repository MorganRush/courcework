'use strict';
module.exports = (sequelize, DataTypes) => {
  const teams = sequelize.define('teams', {
      name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      refClubs: {
          type: DataTypes.STRING,
          allowNull: false,
      }
  });
  teams.associate = (models) => {
      teams.hasMany(models.contracts, {
          foreignKey: 'teamID',
          as: 'contracts',
      });
      // teams.hasMany(models.teamStatistics, {
      //     foreignKey: 'teamID',
      //     as: 'teamStatistics',
      // });
      teams.belongsTo(models.countries, {
          foreignKey: 'countryId',
          onDelete: 'SET NULL',
      });
  };
  return teams;
};