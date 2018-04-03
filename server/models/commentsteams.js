'use strict';
module.exports = (sequelize, DataTypes) => {
  const commentsTeams = sequelize.define('commentsTeams', {
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
  commentsTeams.associate = (models) => {
        commentsTeams.belongsTo(models.teams, {
            foreignKey: 'teamID',
            onDelete: 'CASCADE',
        });
        commentsTeams.belongsTo(models.users, {
            foreignKey: 'userID',
            onDelete: 'CASCADE',
        });
  };
  return commentsTeams;
};