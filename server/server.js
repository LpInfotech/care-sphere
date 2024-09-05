const express = require('express');
const connectToDb = require('./config/connectTodb');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port http://localhost:${process.env.PORT}`);
});
