'use strict';
module.exports = (sequelize, DataTypes) => {
    const cities = sequelize.define('cities', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    cities.associate = (models) => {
        cities.belongsTo(models.countries,{
            foreignKey: 'countryId',
            onDelete: 'CASCADE',
        });
        cities.hasMany(models.teams, {
            foreignKey: 'cityId',
            as: 'teams',
        });
    };
    return cities;
};