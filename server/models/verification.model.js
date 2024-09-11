const mongoose = require('mongoose');
const { schemaTitle } = require('../utils/constants');

const verificationSchema = new mongoose.Schema({
	token: {
		type: String,
		maxlength: 255
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	type: {
		type: String,
		required: true,
		maxlength: 255
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Verification = mongoose.models.Verification || mongoose.model(schemaTitle.VERIFICATION, verificationSchema);

module.exports = Verification;
