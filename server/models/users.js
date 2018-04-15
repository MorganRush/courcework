'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    users.associate = (models) => {
        users.hasMany(models.favoritesPlayer, {
            foreignKey: 'userID',
            as: 'favoritesPlayer',
        });
        users.hasMany(models.commentsPlayers, {
            foreignKey: 'userID',
            as: 'commentsPlayers',
        });
    };
    return users;
};
