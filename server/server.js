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
const app = express();
const cors = require("cors");

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', roleRouter, positionRouter, userRouter,authRouter);
app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectToDb();

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port http://localhost:${process.env.PORT}`);
});
