const { success, error } = require("../utils/responseApi");
const { statusTypes } = require("../utils/constants");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const Verification = require("../models/verification.model");
const { generateToken } = require("../utils/jwt");

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
    if (!user)
      return res
        .status(401)
        .json(error(statusTypes.INCORRECT_CREDENTIAL, res.statusCode));

    if (!user.password) {
      return res
        .status(401)
        .json(error(statusTypes.CREATE_PASSWORD, res.statusCode));
    }

    //check if password is matched
    let checkPassword = await bcrypt.compareSync(password, user.password);

    // Check the password
    // If password is not matched
    // Throw the error
    if (!checkPassword)
      return res
        .status(401)
        .json(error(statusTypes.INCORRECT_CREDENTIAL, res.statusCode));

    // If the requirement above pass
    // Lets send the response with JWT token in it
    const payload = {
      user: {
        id: user._id,
      },
    };

    //create token
    const token = await generateToken(payload);
    if (token) {
      res.cookie("Authorization", token, {
        httpOnly: true,
        secure: true,
      });
    }

    return res
      .status(200)
      .json(success(statusTypes.LOGIN_SUCCESS, { token }, res.statusCode));
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
  if (!token)
    return res
      .status(401)
      .json(error(statusTypes.TOKEN_REQUIRED, res.statusCode));

  const { password } = req.body;

  // Check the password
  if (!password)
    return res
      .status(422)
      .json(error(statusTypes.PASSWORD_REQUIRED, res.statusCode));

  try {
    let verification = await Verification.findOne({
      token,
      type: "EMPTY PASSWORD",
    });

    // Check the verification data
    if (!verification)
      return res
        .status(400)
        .json(
          error("Token / Data that you input is not valid", res.statusCode)
        );

    // If there's verification data
    // Let's find the user first
    const user = await User.findById(verification.userId);

    // Check the user, just in case
    if (!user)
      return res.status(404).json(error("User not found", res.statusCode));

    // Check the user email

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.findByIdAndUpdate(user._id, {
      $set: {
        password: hashedPassword,
        verified: true,
        verifiedAt: new Date(),
      },
    });

    // Lets delete the verification data
    verification = await Verification.findByIdAndDelete(verification._id);

    // Send the response
    return res
      .status(200)
      .json(
        success("Your account verified Successfully", null, res.statusCode)
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
  getUsers,
};
