var express = require('express');
var router = express.Router();
const connection = require('../db/config');

router.get('/', function(req, res, next) {
    latestListings()
    .then(apartments => res.status(200).json({apartments}))
    .catch(error => res.status(500).json({error: error.message}));
});

function latestListings() {
    return new Promise((resolve, reject) => {
        const query = "SELECT apartments.*, cities.`name` as 'city_name', countries.`name` as 'country_name' from apartments join cities on apartments.`city_id` = cities.`id` join countries on cities.`country_id` = countries.`id` ORDER BY created_on DESC limit 10"
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

module.exports = router;