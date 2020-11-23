var express = require('express');
var router = express.Router();
var multer  = require('multer');

const apartments_api = require('../db/api/apartments');
const {canDeleteApartment} = require('../middlewares/auth');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/apartment')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

router.get('/', function(req, res, next) {
  apartments_api.getAll(req.query)
  .then(apartments => res.status(200).json({apartments}))
  .catch(error => res.status(500).json({error: error.message}));
});

router.get('/:apartmentId', function(req, res, next) {
  apartments_api.getById(req.params.apartmentId)
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
});

router.get('/wishList/:userId', function(req, res, next) {
  apartments_api.getByWishList(req.params.userId)
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
});

router.delete('/:apartmentId', canDeleteApartment, function(req, res, next) {
  apartments_api.deleteById(req.params.apartmentId)
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
});

router.post('/', upload.single('main_image'),function(req,res,next) {
  let img = '/images/apartment/' + req.file.filename;
  req.body.main_image = img
  apartments_api.postApartment(req.body)
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
})

router.put('/', upload.single('main_image'),function(req,res,next) {
  if (!req.body.main_image) {
    let img = '/images/apartment/' + req.file.filename;
    req.body.main_image = img
  }
  apartments_api.updateApartment(req.body)
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
})

router.put('/status',function(req,res,next) {
  apartments_api.updateApartmentStatus(req.body)
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
})

module.exports = router;