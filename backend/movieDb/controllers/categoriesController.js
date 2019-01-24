const models = require('../models');
const Category = models.Category

module.exports = {
  index: function(req, res, next){
    Category.findAll({include: 'movies'})
    .then((categories) => res.json({categories}))
    .catch((error) => res.json({error}))
  },
  create: function(req, res, next){
    Category.create({
      title: req.body.title,
    })
    .then((category) => res.json({category}))
    .catch((error) => res.json({error}))
  },
}