'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('commentsTeams', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        },
        countLike: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        countDisLike: {
            type: Sequelize.INTEGER,
            allowNull: true,
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
        },

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('commentsTeams');
  }
};