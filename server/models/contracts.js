'use strict';
module.exports = (sequelize, DataTypes) => {
  const contracts = sequelize.define('contracts', {
      description: {
          type: DataTypes.STRING,
          allowNull: true,
      }
  });
  contracts.associate = (models) => {
      contracts.belongsTo(models.players, {
          foreignKey: 'playerID',
          onDelete: 'CASCADE',
      });
      contracts.belongsTo(models.teams, {
          foreignKey: 'teamID',
          onDelete: 'CASCADE',
      });
  };
  return contracts;
};