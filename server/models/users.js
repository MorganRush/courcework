'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    login:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
  return users;
};
