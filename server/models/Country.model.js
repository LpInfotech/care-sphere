const mongoose = require('mongoose');
const { schemaTitle } = require('../utils/constants');

const CountrySchema = new mongoose.Schema({
	name: {
		type: String
	},
	isoCode: {
		type: String
	}
});

const Country = mongoose.models.Country || mongoose.model(schemaTitle.COUNTRY, CountrySchema);

module.exports = Country;
