'use strict';
module.exports = (sequelize, DataTypes) => {
    const countries = sequelize.define('countries', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        refNations: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    countries.associate = function (models) {
        countries.hasMany(models.players, {
            foreignKey: 'countryId',
            as: 'players',
        });
    };
    return countries;
};