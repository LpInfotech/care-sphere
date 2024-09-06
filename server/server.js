const express = require('express');
const connectToDb = require('./config/connectTodb');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const personRouter = require('./routes/products')
const roleRouter = require('./routes/roles')
const app = express();

app.use(cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use('/api', personRouter)
app.use('/admin', roleRouter)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

connectToDb();

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port http://localhost:${process.env.PORT}`);
});
