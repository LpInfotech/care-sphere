const { success, error } = require('../utils/responseApi');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');
const { statusTypes } = require('../utils/constants');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
dotenv.config();
const Verification = require('../models/verification.model');

// email template
function emailTemplate({ token }) {
	return `
	  <div style="
		line-height: 1.6;
		padding: 48px;
		margin: 20px 25%;
		border-radius: 20px;
		border: 1px groove lightgray;
		color: black;
		font-family: system-ui;
	  ">
		<img src="https://i.postimg.cc/D011Q53g/care-sphere-transparent-logo.png" alt="Care Sphere Logo" style="display: block;" />

		<h2 style="
		  margin-top: 0px;
		  text-align: center;
		  font-size: 16px;
		">
		  Create <span style="color:#283E51; font-weight: 400;">your password</span>
		</h2>
		<div>
		  <p>Hi</p>
		  <p>You have been invited to Care Sphere. Please click on the below button to create your password.</p>
		  <a type="button" href="http://localhost:5173/create-password/${token}" target="_blank" style=" background-color: #5A3F37;border: none;color: #fff;padding: 6px 16px;
		  text-align: center;text-decoration: none;display: block;font-size: 14px;margin:auto;border-radius: 6px;">Click Here</a>
		  <p>Thank you,<br />The Support Team</p>
		</div>
	  </div>
	`;
}

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

		// Save token for user to start verifying the account
		let verification = new Verification({
			token: uuidv4(),
			userId: newUser._id,
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
			subject: 'Create Password',
			html: emailTemplate({ token })
		};

		transporter.sendMail(mailOptions, async function (error, info) {
			if (error) {
				return res.status(400).send({
					error: statusTypes.SOMETHING_WENT_WRONG
				});
			} else {
				// Send the response to server
				res.status(201).json(
					success(
						'User created successfully',
						{
							newUser: {
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
			}
		});
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const deleteAllUsers = async (req, res) => {
	try {
		const deleteResult = await User.deleteMany({});
		return res.status(200).json(success(`All Users deleted successfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	createUser,
	deleteAllUsers
};
