var express = require('express');
var router = express.Router();
const rent_sale_api = require('../db/api/sale_rent_api');


router.get('/', function(req, res, next) {
    rent_sale_api.SaleRentApartments('rent')
    .then(apartments => res.status(200).json({apartments}))
    .catch(error => res.status(500).json({error: error.message}));
});

router.get('/total', function(req, res, next) {
    rent_sale_api.totalSaleRentApartments('rent')
    .then(apartments => res.status(200).json({apartments}))
    .catch(error => res.status(500).json({error: error.message}));
});

module.exports = router;