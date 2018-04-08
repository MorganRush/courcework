'use strict';
module.exports = (sequelize, DataTypes) => {
    const contracts = sequelize.define('contracts', {
        reiting: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pac: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sho: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pas: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dri: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        def: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        refImage: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    contracts.associate = (models) => {
        contracts.belongsTo(models.players, {
            foreignKey: 'playerID',
            onDelete: 'CASCADE',
        });
        contracts.belongsTo(models.teams, {
            foreignKey: 'teamID',
            onDelete: 'CASCADE',
        });
        // contracts.belongsTo(models.playersStatistics, {
        //     foreignKey: 'playersStatisticsID',
        //     onDelete: 'CASCADE',
        // });
    };
    return contracts;
};