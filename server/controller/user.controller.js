const { success, error } = require('../utils/responseApi');
const User = require('../models/User.model');

const createUser = async (req, res) => {
	/*  #swagger.tags = ['Users']
       #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { $ref: '#/definitions/User' }
        } */
		const user = await User.findOne({ email: req.body.email });

		if (user) return res.status(401).json(error('This email already exists', res.statusCode));

		const newUser = await User.create(req.body);

		await newUser.save();

		// Send the response to server
		res.status(201).json(success('User created successfully', newUser, res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const deleteAllUsers = async (req, res) => {
	try {
		const deleteResult = await User.deleteMany({});
		return res.status(200).json(success(`All Users deleted succesfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	createUser,
	deleteAllUsers
};
