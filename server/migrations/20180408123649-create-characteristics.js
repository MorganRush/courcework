'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('characteristics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            refImage: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            reiting: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            strongFoot: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            age: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            height: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            workrates: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            acceleration: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sprintSpeed: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            positioning: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            finishing: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            shotPower: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            longShots: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            volleys: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            penalties: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            vision: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            crossing: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            freeKick: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            shortPassing: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            longPassing: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            curve: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            agility: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            balance: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            reactions: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ballControl: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            dribbling: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            composure: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            interceptions: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            heading: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            marking: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            standingTackle: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            slidingTackle: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            jumping: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            stamina: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            strength: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            aggression: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        return queryInterface.dropTable('characteristics');
    }
};