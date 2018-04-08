'use strict';
module.exports = (sequelize, DataTypes) => {
    const characteristics = sequelize.define('characteristics', {
        refImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reiting: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        strongFoot: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        workrates: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        acceleration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sprintSpeed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        positioning: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        finishing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shotPower: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longShots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        volleys: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        penalties: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        vision: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        crossing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        freeKick: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        shortPassing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longPassing: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        curve: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        agility: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reactions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ballControl: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dribbling: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        composure: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        interceptions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        heading: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        marking: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        standingTackle: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        slidingTackle: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jumping: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stamina: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        aggression: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    characteristics.associate = (models) => {
        // associations can be defined here
    };
    return characteristics;
};