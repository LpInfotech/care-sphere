const express = require('express');
const connectToDb = require('./config/connectTodb');
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const roleRouter = require('./routes/role.route');
const positionRouter = require('./routes/position.route');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const regionRouter = require('./routes/region.route');
const app = express();
const cors = require('cors');
const countryModel = require('./models/Country.model');
const stateModel = require('./models/State.model');
const cityModel = require('./models/City.model');
const { Country, State, City } = require('country-state-city');

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', roleRouter, positionRouter, userRouter, authRouter, regionRouter);
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectToDb();

// populate countries
const populateCountries = async () => {
	try {
		const countries = Country.getAllCountries();

		const countryDocs = countries.map((country) => ({
			name: country.name,
			isoCode: country.isoCode
		}));
		// Check if countries already exist in the database
		const existingCountries = await countryModel.find();
		if (existingCountries.length === 0) {
			// If no countries exist, insert new countries
			await countryModel.insertMany(countryDocs, { ordered: false });
			console.log('Countries added successfully!');
		} else {
			console.log('Countries already exist in the database. No action taken.');
		}
	} catch (error) {
		console.error('Error adding countries:', error);
	}
};

// populate states
const populateStates = async () => {
	try {
		const states = State.getAllStates();

		const stateDocs = states.map((state) => ({
			name: state.name,
			isoCode: state.isoCode,
			countryCode: state.countryCode
		}));
		// Check if states already exist in the database
		const existingStates = await stateModel.find();
		if (existingStates.length === 0) {
			// If no states exist, insert new states
			await stateModel.insertMany(stateDocs, { ordered: false });
			console.log('States added successfully!');
		} else {
			console.log('States already exist in the database. No action taken.');
		}
	} catch (error) {
		console.error('Error adding states:', error);
	}
};

// populate cities
const populateCities = async () => {
	try {
		const cities = City.getAllCities();

		const cityDocs = cities.map((city) => ({
			name: city.name,
			countryCode: city.countryCode,
			stateCode: city.stateCode
		}));
		// Check if cities already exist in the database
		const existingCities = await cityModel.find();
		if (existingCities.length === 0) {
			// If no cities exist, insert new cities
			await cityModel.insertMany(cityDocs, { ordered: false });
			console.log('Cities added successfully!');
		} else {
			console.log('Cities already exist in the database. No action taken.');
		}
	} catch (error) {
		console.error('Error adding Cities:', error);
	}
};

populateCountries();
populateStates();
populateCities();

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port http://localhost:${process.env.PORT}`);
});
