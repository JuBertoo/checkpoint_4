var express = require('express');
var router = express.Router();
const moviesController = require('../controllers/moviesController')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

/* GET users listing. */
router.get('/', moviesController.index);

router.get('/:id', moviesController.show);

router.post('/',  upload.single('picture'), moviesController.create);

router.put('/:id', moviesController.update);

router.delete('/:id', moviesController.delete);

router.post('/find-by-name', moviesController.findMovieByTitle);

module.exports = router;
