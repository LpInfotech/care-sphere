const mongoose = require('mongoose');
const { schemaTitle } = require('../utils/constants');

const StateSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	isoCode: {
		type: String,
		required: true
	},
	countryCode: {
		type: String,
		required: true
	}
});

const State = mongoose.models.State || mongoose.model(schemaTitle.STATE, StateSchema);

module.exports = State;
