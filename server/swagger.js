const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
	info: {
		version: '1.0.0',
		title: 'Care Sphere API Documentation',
		description: 'Description'
	},
	host: 'localhost:3000/api',
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [
		{
			name: 'Products',
			description: 'products apis'
		},
		{
			name: 'Todo',
			description: 'Todo App'
		}
	],
	definitions: {
		Product: {
			name: 'name',
			price: 10
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
