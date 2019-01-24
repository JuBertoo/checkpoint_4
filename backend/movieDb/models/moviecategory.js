'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieCategory = sequelize.define('MovieCategory', {
    movieId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  MovieCategory.associate = function(models) {
    MovieCategory.belongsTo(models.Category, {foreignKey: 'categoryId'})
    MovieCategory.belongsTo(models.Movie, {foreignKey: 'movieId'})
  };
  return MovieCategory;
};