'use strict';
module.exports = (sequelize, DataTypes) => {
  const countries = sequelize.define('countries', {
      name:{
          type: DataTypes.STRING,
          allowNull: false,
      }
  });
  countries.associate = function(models) {
      countries.hasMany(models.cities, {
          foreignKey: 'countryID',
          as: 'cities',
      });
  };
  return countries;
};