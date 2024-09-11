const mongoose = require('mongoose');
const { schemaTitle } = require('../utils/constants');

const positionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	code: {
		type: Number,
		required: true
	},
	isActive: {
		type: Boolean,
		default: undefined
	},
	roleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: schemaTitle.ROLE
	}
});

const Position = mongoose.models.Position || mongoose.model(schemaTitle.POSITION, positionSchema);

module.exports = Position;
