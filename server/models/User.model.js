const mongoose = require('mongoose');
const { schemaTitle } = require('../utils/constants');
const userSchema = new mongoose.Schema({
	isStaff: {
		type: Boolean,
		default: false
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	secondaryEmailAddress: {
		type: String,
		required: true
	},
	address: {
		streetAddress: {
			type: String,
			required: true
		},
		province: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		postCode: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		}
	},
	mobileNumber: [
		{
			type: String,
			required: true
		}
	],
	isActive: {
		type: Boolean,
		default: true
	},
	roleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: schemaTitle.ROLE
	},
	positionId: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: schemaTitle.POSITION
		}
	],
	division: {
		type: String,
		required: true
	},
	divisionSupervisor: {
		type: String,
		required: true
	},
	allergies: {
		type: String,
		required: true
	},
	doYouDrive: {
		type: Boolean
	},
	driveParticipants: {
		type: Boolean
	},
	dateOfBirth: {
		type: Date
	},
	employeeNumber: {
		type: String
	},
	payType: {
		type: String,
		required: true
	},
	statusType: {
		type: String,
		required: true
	},
	wellnessDays: {
		type: String,
		required: true
	},
	vacationDays: {
		type: String,
		required: true
	},
	emergencyContacts: [
		{
			name: {
				type: String,
				required: true
			},
			phone: {
				type: String,
				required: true
			},
			relationship: {
				type: String,
				required: true
			}
		}
	],
	startDate: {
		type: Date
	},
	isTerminate: {
		type: Boolean
	},
	terminateDate: {
		type: Date
	},
	terminateNote: {
		type: String
	},
	reasonForeLeave: {
		type: String
	},
	returnDate: {
		type: Date
	},
	password: {
		type: String
	},
	verified: {
		type: Boolean,
		default: false
	},
	verifiedAt: {
		type: Date
	},
	isPasswordCreated: { type: Boolean, default: false }
});

const User = mongoose.models.User || mongoose.model(schemaTitle.USER, userSchema);

module.exports = User;
