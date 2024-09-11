const { success, error } = require('../utils/responseApi');
const { statusTypes } = require('../utils/constants');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const Verification = require('../models/verification.model');
const { generateToken } = require('../utils/jwt');

/**
 * @desc    Login a user
 * @method  POST api/auth/login
 * @access  public
 */
const login = async (req, res) => {
	/*  #swagger.tags = ['Users']
       #swagger.description = '' */
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		// Check the email
		// If email not exist
		// Throw the error
		if (!user) return res.status(401).json(error(statusTypes.INCORRECT_CREDENTIAL, res.statusCode));

		//check if password is matched
		let checkPassword = await bcrypt.compareSync(password, user.password);

		// Check the password
		// If password is not matched
		// Throw the error
		if (!checkPassword) return res.status(401).json(error(statusTypes.INCORRECT_CREDENTIAL, res.statusCode));

		// If the requirement above pass
		// Lets send the response with JWT token in it
		const payload = {
			user: {
				id: user._id
			}
		};

		//create token
		const token = await generateToken(payload);
		if (token) {
			res.cookie('Authorization', token, {
				httpOnly: true,
				secure: true
			});
		}

		return res.status(200).json(success(statusTypes.LOGIN_SUCCESS, { token }, res.statusCode));
	} catch (err) {
		res.status(500).json(error(err.message, res.statusCode));
	}
};

/**
 * @desc    Create a new user password
 * @method  POST api/auth/createPassword/:email
 * @access  public
 */
const createPassword = async (req, res) => {
	const userEmail = req.params.email;
	const { password } = req.body;
	try {
		const user = await User.findOne({ email: userEmail });
		// Check the user email
		if (!user) return res.status(401).json(error(statusTypes.INVALID_CREDENTIAL, res.statusCode));

		// Check the user email
		if (user.isPasswordCreated) return res.status(401).json(error('Password is already Created', res.statusCode));

		const hashedPassword = bcrypt.hashSync(password, 10);

		const newUser = await User.findByIdAndUpdate(user._id, {
			$set: {
				password: hashedPassword,
				isPasswordCreated: true
			}
		});

		// Save token for user to start verificating the account
		let verification = new Verification({
			token: uuidv4(),
			userId: newUser._id,
			type: 'Password Created'
		});

		// Save the verification data
		await verification.save();

		// Send the response to server
		res.status(201).json(
			success(
				'Register success, please activate your account.',
				{
					user: {
						id: newUser._id,
						name: newUser.name,
						email: newUser.email,
						verified: newUser.verified,
						verifiedAt: newUser.verifiedAt
					},
					verification
				},
				res.statusCode
			)
		);
	} catch (err) {
		res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const getUsers = async (req, res) => {
	/*  #swagger.tags = ['Users']
		 #swagger.description = '' */
	try {
		/*  #swagger.parameters['isActive'] = {
			  "name": "isActive",
			  "in": "query",
			  "description": "isActive values that need to be considered for filter",
			  "default": undefined,
			  "required": false,
			  "type": "boolean",
			  "enum": [true, false],
	  } */

		let responseList;

		if (req.query.isActive === undefined) {
			responseList = await User.find().exec();
		} else {
			responseList = await User.find({ isActive: req.query.isActive }).exec();
		}

		return res
			.status(200)
			.json(
				success(
					`Users fetched succesfully`,
					{ recordCount: responseList.length, records: responseList },
					res.statusCode
				)
			);
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	login,
	createPassword,
	getUsers
};
