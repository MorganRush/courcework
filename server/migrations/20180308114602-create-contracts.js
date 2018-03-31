'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contracts', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      description: {
          allowNull: true,
          type: Sequelize.STRING
      },
      playerID: {
          references: {
              model: 'players',
              key: 'id',
              as: 'contracts'
          },
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER,
      },
      teamID: {
          references: {
              model: 'teams',
              key: 'id',
              as: 'contracts'
          },
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER,
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contracts');
  }
};