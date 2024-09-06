const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

const config = {
	info: {
		version: '1.0.0',
		title: 'Care Sphere API Documentation',
		description: 'Description'
	},
	host: 'localhost:3000',
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [
		{
			name: 'Products',
			description: 'products apis'
		},
		{
			name: 'Roles',
			description: 'Roles desc'
		}
	],
	definitions: {
		Product: {
			name: 'product-name',
			price: 10
		},
		Role: {
			name: 'role-name',
			order: 0
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
