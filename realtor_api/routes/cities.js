var express = require('express');
var router = express.Router();
const apartments_api = require('../db/api/apartments');

router.get('/', function(req, res, next) {
    apartments_api.getCities()
      .then(apartment => res.status(200).json(apartment))
      .catch(error => res.status(500).json({error: error.message}));
});

router.get('/total', function(req, res, next) {
  apartments_api.getTotalCities()
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
});

module.exports = router;