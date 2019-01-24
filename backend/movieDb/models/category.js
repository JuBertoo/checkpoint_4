'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.belongsToMany(models.Movie, {through: 'MovieCategories', as: 'movies'})
  };
  return Category;
};