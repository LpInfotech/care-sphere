const { success, error } = require('../utils/responseApi');
const Verification = require('../models/verification.model');

const getVerification = async (req, res) => {
	/*  #swagger.tags = ['Users']
       #swagger.description = '' */
	const token = req.params.token;

	// Check the token first
	if (!token) return res.status(401).json(error(statusTypes.TOKEN_REQUIRED, res.statusCode));
	try {
		let verification = await Verification.findOne({
			token,
			type: 'EMPTY PASSWORD'
		});

		// Check the verification data
		if (!verification) return res.status(400).json(error('Token / Data that you input is not valid', res.statusCode));

		return res.status(200).json(success(`Verification fetched successfully`, verification, res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const deleteAllVerifications = async (req, res) => {
	try {
		const deleteResult = await Verification.deleteMany({});
		return res.status(200).json(success(`All Verifications deleted successfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	getVerification,
	deleteAllVerifications
};
