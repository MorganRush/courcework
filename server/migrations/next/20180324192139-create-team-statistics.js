'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teamStatistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      procentWinner: {
        type: Sequelize.INTEGER
      },
      pac: {
        type: Sequelize.INTEGER
      },
      sho: {
        type: Sequelize.INTEGER
      },
      pas: {
        type: Sequelize.INTEGER
      },
      dri: {
        type: Sequelize.INTEGER
      },
      def: {
        type: Sequelize.INTEGER
      },
      phy: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('teamStatistics');
  }
};