const mongoose = require('mongoose');
const { schemaTitle } = require('../utils/constants');

const CitySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	countryCode: {
		type: String,
		required: true
	},
	stateCode: {
		type: String,
		required: true
	}
});

const City = mongoose.models.City || mongoose.model(schemaTitle.CITY, CitySchema);

module.exports = City;
