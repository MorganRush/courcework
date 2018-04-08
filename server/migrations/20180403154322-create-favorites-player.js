'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('favoritesPlayers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            playerID: {
                references: {
                    model: 'players',
                    key: 'id',
                    as: 'players'
                },
                onDelete: 'CASCADE',
                type: Sequelize.INTEGER,
            },
            userID: {
                references: {
                    model: 'users',
                    key: 'id',
                    as: 'users'
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
        return queryInterface.dropTable('favoritesPlayers');
    }
};