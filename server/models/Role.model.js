const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
	{
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
			enum: [true, false],
			default: true
		}
	},
	{ timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

module.exports = Role;
