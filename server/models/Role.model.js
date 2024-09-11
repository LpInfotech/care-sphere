const mongoose = require('mongoose');
const { schemaTitle } = require('../utils/constants');

const roleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	order: {
		type: Number,
		required: true
	},
	isActive: {
		type: Boolean,
		default: undefined
	}
});

const Role = mongoose.models.Role || mongoose.model(schemaTitle.ROLE, roleSchema);

module.exports = Role;
