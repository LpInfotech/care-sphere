const express = require('express');
const {
	getCountries,
	getStates,
	getCities,
	deleteAllCountries,
	deleteAllStates,
	deleteAllCities
} = require('../controller/region.controller');

const router = express.Router();

router.get('/region/countries', getCountries);
router.get('/region/:countryCode/states', getStates);
router.get('/region/:countryCode/:stateCode/cities', getCities);
router.delete('/region/deleteAllCountries', deleteAllCountries);
router.delete('/region/deleteAllStates', deleteAllStates);
router.delete('/region/deleteAllCities', deleteAllCities);

module.exports = router;
