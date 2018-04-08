'use strict';
module.exports = (sequelize, DataTypes) => {
    const commentsPlayers = sequelize.define('commentsPlayers', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        countLike: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        countDisLike: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });

    commentsPlayers.associate = (models) => {
        commentsPlayers.belongsTo(models.players, {
            foreignKey: 'playerID',
            onDelete: 'CASCADE',
        });
        commentsPlayers.belongsTo(models.users, {
            foreignKey: 'userID',
            onDelete: 'CASCADE',
        });
    };
    return commentsPlayers;
};