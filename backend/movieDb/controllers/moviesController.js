const models = require('../models');
const Movie = models.Movie

module.exports = {
  index: function(req, res, next){
    Movie.findAll()
    .then((movies) => {
      res.json({movies})
    })
    .catch((err) => res.json({err}))
  },
  show: function(req, res, next){
    Movie.findByPk(req.params.id)
    .then((movie) => {
      if(movie){
        res.json({movie})
      } else {
        res.json({message: 'Movie not found !'})
      }
    })
    .catch((err) => res.json({err}))
  },
  create: function(req, res, next){
    Movie.create({
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
      picture: `http://${req.get('Host')}/uploads/${req.file.originalname}`
    }, {include: 'categories'})
    .then((movie) => {
      if(req.body.categoryIds){
        let categoryIds = req.body.categoryIds.split(',').map((id) => parseInt(id))
        movie.setCategories(categoryIds)
        .then((movie) => {
          res.json({movie})
        })
        .catch((err) => res.json({err}))
      }
      else {
        res.json({movie})  
      }
    })
    .catch((err) => res.json({err}))
  },
  update: function(req, res, next){
    Movie.findByPk(req.params.id)
    .then((movie) => {
      if(movie){
        movie.update({
          title: req.body.title,
          description: req.body.description,
          rating: req.body.rating,
        })
        .then((movie) => {
          res.json({movie})
        })
        .catch((err) => res.json({err}))
      } else {
        res.json({message: 'Movie not found !'})
      }
    })
    .catch((err) => res.json({err}))
  },
  delete: function(req, res, next){
    Movie.findByPk(req.params.id)
    .then((movie) => {
      if(movie){
        movie.destroy()
        .then((movie) => {
          res.json({message: 'Movie has been deleted !'})
        })
        .catch((err) => res.json({err}))
      } else {
        res.json({message: 'Movie not found !'})
      }
    })
    .catch((err) => res.json({err}))
  },

  findMovieByTitle: function(req, res, next){
    Movie.findAll({
      limit: 5,
      where: { title: { like: `${req.body.title}%`}},
    })
    .then((movies) => res.json({movies}))
    .catch((error) => console.log(error))
  }
}