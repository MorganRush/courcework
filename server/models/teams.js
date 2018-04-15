'use strict';
module.exports = (sequelize, DataTypes) => {
    const teams = sequelize.define('teams', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refClubs: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    teams.associate = (models) => {
        teams.hasMany(models.contracts, {
            foreignKey: 'teamID',
            as: 'contracts',
        });
    };
    return teams;
};