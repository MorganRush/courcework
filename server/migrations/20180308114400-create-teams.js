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
            refClubs: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            countryId: {
                references: {
                    model: 'countries',
                    key: 'id',
                    as: 'cities'
                },
                onDelete: 'CASCADE',
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