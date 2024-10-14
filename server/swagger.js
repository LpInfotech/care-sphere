const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];
const config = {
	info: {
		version: '1.0.0',
		title: 'Care Sphere API Documentation',
		description: 'Care Sphere API Documentation'
	},
	host: 'localhost:3000',
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [
		{
			name: 'Roles',
			description: 'Roles List'
		},
		{
			name: 'Positions',
			description: 'Positions List'
		},
		{
			name: 'Users',
			description: 'Users List'
		},
		{
			name: 'Regions',
			description: 'Regions List'
		}
	],
	definitions: {
		Role: {
			name: 'role-name',
			order: 0
		},
		Position: {
			name: 'position-name',
			code: 123,
			isActive: true,
			roleId: '66dafcc7985b4581b2716913'
		},
		User: {
			isStaff: false,
			firstName: 'John',
			lastName: 'Smith',
			secondaryEmailAddress: 'test@example.com',
			email: 'aman.katal@lpinfotech.com',
			address: {
				streetAddress: '3189 Broadway W',
				province: 'British Columbia',
				city: 'Vancouver',
				postCode: '6K 2H2',
				country: 'Canada'
			},
			mobileNumber: ['(604) 738-5551'],
			isActive: true,
			roleId: '66dafcc7985b4581b2716913',
			positionId: ['66dafcc7985b4581b2716913'],
			division: 'test',
			divisionSupervisor: 'supervisor',
			allergies: 'Drug Allergy',
			doYouDrive: false,
			driveParticipants: false,
			dateOfBirth: '',
			employeeNumber: '123',
			payType: 'Hourly',
			statusType: 'Casual',
			benefitsStartDate: '',
			wellnessDays: 1,
			vacationDays: 2,
			emergencyContacts: [
				{
					name: 'David',
					phone: '988898989',
					relationship: 'boyfriend'
				}
			],
			startDate: '',
			isTerminate: false,
			terminateDate: '',
			terminateNote: '',
			reasonForLeave: '',
			returnDate: '',
			password: '',
			verified: false,
			verifiedAt: ''
		}
	},
	securityDefinitions: {
		Bearer: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header'
		}
	}
};

swaggerAutogen(outputFile, endpointsFiles, config);
