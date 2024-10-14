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

router.get('/regions/countries', getCountries);
router.get('/regions/:countryCode/states', getStates);
router.get('/regions/:countryCode/:stateCode/cities', getCities);
router.delete('/regions/deleteAllCountries', deleteAllCountries);
router.delete('/regions/deleteAllStates', deleteAllStates);
router.delete('/regions/deleteAllCities', deleteAllCities);

module.exports = router;
