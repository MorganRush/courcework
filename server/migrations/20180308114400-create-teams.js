'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teams', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        cityId: {
            references: {
                model: 'cities',
                key: 'id',
                as: 'teams'
            },
            onDelete: 'SET NULL',
            type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('teams');
  }
};