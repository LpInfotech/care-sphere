const mongoose = require('mongoose');
const { schemaTitle } = require('../utils/constants');

const DivisionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	coordinatorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: schemaTitle.USER,
		required: true
	},
	code: {
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		default: false
	}
});

const Division = mongoose.models.Division || mongoose.model(schemaTitle.DIVISION, DivisionSchema);

module.exports = Division;
