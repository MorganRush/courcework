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
        reiting: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        pac: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        sho: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        pas: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dri: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        def: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        phy: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        refImage: {
            type: Sequelize.STRING,
            allowNull: false,
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