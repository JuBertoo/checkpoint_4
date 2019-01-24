'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    picture: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    Movie.belongsToMany(models.Category, {through: 'MovieCategories', as: 'categories'})
  };
  return Movie;
};