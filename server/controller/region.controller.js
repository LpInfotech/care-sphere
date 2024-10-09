const { success, error } = require('../utils/responseApi');
const { statusTypes } = require('../utils/constants');
const countryModel = require('../models/Country.model');
const stateModel = require('../models/State.model');
const cityModel = require('../models/City.model');

const getCountries = async (req, res) => {
	/*  #swagger.tags = ['Regions']
       #swagger.description = '' */
	try {
		const countries = await countryModel.find().exec();

		return res
			.status(200)
			.json(
				success(`Countries fetched successfully`, { recordCount: countries.length, records: countries }, res.statusCode)
			);
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const getStates = async (req, res) => {
	/*  #swagger.tags = ['Regions']
       #swagger.description = '' */

	try {
		const states = await stateModel.find({ countryCode: req.params.countryCode.toUpperCase() });
		return res
			.status(200)
			.json(success(`States fetched successfully`, { recordCount: states.length, records: states }, res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const getCities = async (req, res) => {
	/*  #swagger.tags = ['Regions']
       #swagger.description = '' */

	try {
		const cities = await cityModel.find({ stateCode: req.params.stateCode.toUpperCase() });
		return res
			.status(200)
			.json(success(`Cities fetched successfully`, { recordCount: cities.length, records: cities }, res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const deleteAllCountries = async (req, res) => {
	/*  #swagger.tags = ['Regions']
       #swagger.description = '' */
	try {
		const deleteResult = await countryModel.deleteMany({});
		return res.status(200).json(success(`All Countries deleted successfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const deleteAllStates = async (req, res) => {
	/*  #swagger.tags = ['Regions']
       #swagger.description = '' */
	try {
		const deleteResult = await stateModel.deleteMany({});
		return res.status(200).json(success(`All States deleted successfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const deleteAllCities = async (req, res) => {
	/*  #swagger.tags = ['Regions']
       #swagger.description = '' */
	try {
		const deleteResult = await cityModel.deleteMany({});
		return res.status(200).json(success(`All Cities deleted successfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	getCountries,
	getStates,
	getCities,
	deleteAllCountries,
	deleteAllStates,
	deleteAllCities
};
