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
	},
	address: {
		streetAddress: {
			type: String,
		},
		province: {
			type: String,
		},
		city: {
			type: String,
		},
		postCode: {
			type: String,
		},
		country: {
			type: String,
		}
	},
	mobileNumber: [
		{
			type: String,
		}
	],
	isActive: {
		type: Boolean,
		default: true
	},
	roleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: schemaTitle.ROLE,
		required: true
	},
	positionId: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: schemaTitle.POSITION,
			required: true
		}
	],
	division: {
		type: String,
		required: true
	},
	divisionSupervisor: {
		type: String,
	},
	allergies: {
		type: String,
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
	benefitsStartDate: {
		type: Date
	},
	wellnessDays: {
		type: Number,
		required: true
	},
	vacationDays: {
		type: Number,
		required: true
	},
	emergencyContacts: [
		{
			name: {
				type: String,
			},
			phone: {
				type: String,
			},
			relationship: {
				type: String,
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
	reasonForLeave: {
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
});

const User = mongoose.models.User || mongoose.model(schemaTitle.USER, userSchema);

module.exports = User;
