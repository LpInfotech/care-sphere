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
              Create <span style="color:#283E51; font-weight: 400;">your password</span>
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 0 24px; font-family: system-ui; color: black; line-height: 1.6;">
            <p>Hi,</p>
            <p>You have been invited to Care Sphere. Please click on the button below to create your password.</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px;">
            <a href="http://localhost:5173/create-password/${token}" target="_blank" style="background-color: #5A3F37; color: #ffffff; padding: 12px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 14px; border-radius: 6px;">
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
