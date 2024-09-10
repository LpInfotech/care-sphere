const express = require('express');
const connectToDb = require('./config/connectTodb');
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const roleRouter = require('./routes/roles');
const positionRouter = require('./routes/positions');
const userRouter = require('./routes/user.route');
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use('/api', roleRouter, positionRouter, userRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectToDb();

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port http://localhost:${process.env.PORT}`);
});
