'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('favoritesTeams', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            teamID: {
                references: {
                    model: 'teams',
                    key: 'id',
                    as: 'teams'
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
        return queryInterface.dropTable('favoritesTeams');
    }
};