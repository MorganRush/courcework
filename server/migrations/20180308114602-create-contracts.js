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