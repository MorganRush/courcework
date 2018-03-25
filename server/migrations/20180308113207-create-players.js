'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('players', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      surname: {
          type: Sequelize.STRING,
          allowNull: false
      },
      createdAt: {
          allowNull: true,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: true,
          type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('players');
  }
};