const { success, error } = require('../utils/responseApi');
const { statusTypes } = require('../utils/constants');
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const Verification = require('../models/verification.model');
const { generateToken } = require('../utils/jwt');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

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

		if (!user.password) {
			return res.status(401).json(error(statusTypes.CREATE_PASSWORD, res.statusCode));
		}

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
 * @method  POST api/auth/createPassword/:token
 * @access  public
 */
const createPassword = async (req, res) => {
	/*  #swagger.tags = ['Users']
       #swagger.description = '' */
	const token = req.params.token;

	// Check the token first
	if (!token) return res.status(401).json(error(statusTypes.TOKEN_REQUIRED, res.statusCode));

	const { password } = req.body;

	// Check the password
	if (!password) return res.status(422).json(error(statusTypes.PASSWORD_REQUIRED, res.statusCode));

	try {
		let verification = await Verification.findOne({
			token,
			type: 'EMPTY PASSWORD'
		});

		// Check the verification data
		if (!verification) return res.status(400).json(error('Token / Data that you input is not valid', res.statusCode));

		// If there's verification data
		// Let's find the user first
		const user = await User.findById(verification.userId);

		// Check the user, just in case
		if (!user) return res.status(404).json(error('User not found', res.statusCode));

		// Check the user email

		const hashedPassword = bcrypt.hashSync(password, 10);

		const newUser = await User.findByIdAndUpdate(user._id, {
			$set: {
				password: hashedPassword,
				verified: true,
				verifiedAt: new Date()
			}
		});

		// Lets delete the verification data
		verification = await Verification.findByIdAndDelete(verification._id);

		// Send the response
		return res.status(200).json(success('Your account verified Successfully', null, res.statusCode));
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
					`Users fetched successfully`,
					{ recordCount: responseList.length, records: responseList },
					res.statusCode
				)
			);
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

// email template
function emailTemplate({ token }) {
	return `
	  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 48px;">
  <tr>
    <td align="center">
      <table border="0" cellpadding="0" cellspacing="0" width="600" style="border-radius: 20px; border: 1px groove lightgray; background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <img src="https://i.postimg.cc/D011Q53g/care-sphere-transparent-logo.png" alt="Care Sphere Logo" style="display: block; max-width: 100%; height: auto;" />
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0 24px;">
            <h2 style="font-size: 16px; font-family: system-ui; color: black; margin-top: 0; text-align: center;">
              Reset <span style="color:#283E51; font-weight: 400;">your password</span>
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 24px; font-family: system-ui; color: black; line-height: 1.6;">
            <p>Hi,</p>
            <p>Thanks for being a member of the Care Sphere community. Please click on the button below to reset your password.</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px;">
            <a href="http://localhost:5173/forgot-password/${token}" target="_blank" style="background-color: #5A3F37; color: #ffffff; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; border-radius: 6px;">
              Click Here
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 24px 24px; font-family: system-ui; color: black; line-height: 1.6;">
            <p>Thank you,<br />The Support Team</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

/**
 * @desc    Reset password
 * @method  POST api/auth/forgotPassword/:token
 * @access  public
 */

const forgotPassword = async (req, res) => {
	/*  #swagger.tags = ['Users']
       #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { email : "test@gmail.com"}
        } */
		const user = await User.findOne({ email: req.body.email });

		if (!user) return res.status(401).json(error("This email doesn't exist", res.statusCode));

		if (!user.password) {
			return res.status(401).json(error('You have not created any password yet.', res.statusCode));
		}

		// Save token for user to start verifying the account
		let verification = new Verification({
			token: uuidv4(),
			userId: user._id,
			type: 'EMPTY PASSWORD'
		});

		let token = verification.token;

		// Save the verification data
		await verification.save();

		// create transporter
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.ADMIN_EMAIL,
				pass: process.env.ADMIN_PASSWORD
			}
		});

		// create mail-options
		const mailOptions = {
			from: process.env.ADMIN_EMAIL,
			to: req.body.email,
			subject: 'Update Password',
			html: emailTemplate({ token })
		};

		transporter.sendMail(mailOptions, async function (error, info) {
			if (error) {
				return res.status(400).send({
					error: statusTypes.SOMETHING_WENT_WRONG
				});
			} else {
				// Send the response to server
				res.status(201).json(success('Email to reset password sent successfully', res.statusCode));
			}
		});
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const resetPassword = async (req, res) => {
	/*  #swagger.tags = ['Users']
      #swagger.description = '' */
	const token = req.params.token;

	// Check the token first
	if (!token) return res.status(401).json(error(statusTypes.TOKEN_REQUIRED, res.statusCode));

	const { password } = req.body;

	// Check the password
	if (!password) return res.status(422).json(error(statusTypes.PASSWORD_REQUIRED, res.statusCode));

	try {
		let verification = await Verification.findOne({
			token,
			type: 'EMPTY PASSWORD'
		});

		// Check the verification data
		if (!verification) return res.status(400).json(error('Token / Data that you input is not valid', res.statusCode));

		// If there's verification data
		// Let's find the user first
		const user = await User.findById(verification.userId);

		// Check the user, just in case
		if (!user) return res.status(404).json(error('User not found', res.statusCode));

		// Check the user email

		const hashedPassword = bcrypt.hashSync(password, 10);

		const newUser = await User.findByIdAndUpdate(user._id, {
			$set: {
				password: hashedPassword,
				verified: true,
				verifiedAt: new Date()
			}
		});

		// Let's delete the verification data
		verification = await Verification.findByIdAndDelete(verification._id);

		// Send the response
		return res.status(200).json(success('Password reset successfully', null, res.statusCode));
	} catch (err) {
		res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const getUserProfile = async (req, res) => {
	/*  #swagger.tags = ['Users']
      #swagger.description = '
	  ' */
	try {
		const user = await User.findById(req.user.id).select('-password');
		// Check the user just in case
		if (!user) {
			return res.status(404).json(error('User not found', res.statusCode));
		} else {
			return res.status(200).json(success(`Fetched user profile Successfully`, { user: user }, res.statusCode));
		}
	} catch (err) {
		console.log(err.message);
		return res.status(500).json(error(err.message, res.statusCode));
	}
};

const updateUserById = async (req, res) => {
	/*  #swagger.tags = ['Users']
      #swagger.description = '' 
	 */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { $ref: '#/definitions/User' }
        } */
		const userId = req.params.id;
		const updateData = { ...req.body }; // Spread all fields from the request body


		const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password -email');
		return res.status(200).json(success(`Updated user Successfully`, { user: updateUser }, res.statusCode));
	} catch (err) {
		return res.status(500).json(error(err.message, res.statusCode));
	}
};

module.exports = {
	login,
	createPassword,
	getUsers,
	resetPassword,
	forgotPassword,
	getUserProfile,
	updateUserById
};
