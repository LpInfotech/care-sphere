const { success, error } = require('../utils/responseApi');
const positionModel = require('../models/position.model');

const createPosition = async (req, res) => {
	/*  #swagger.tags = ['Positions']
       #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { $ref: '#/definitions/Position' }
        } */

		let existingPosition = await positionModel.findOne({ name: req.body.name });
		if (!existingPosition) {
			const newPosition = await positionModel.create({
				name: req.body.name,
				code: req.body.code,
				isActive: true,
				roleId: req.body.roleId
			});
			return res.status(201).json(success(`Position Created Successfully`, newPosition, res.statusCode));
		}
		return res.status(409).json(error('This position already exists', res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const getPositions = async (req, res) => {
	/*  #swagger.tags = ['Positions']
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
			responseList = await positionModel
				.find()
				.populate({
					path: 'roleId',
					select: '_id name'
				})
				.exec();
		} else {
			responseList = await positionModel
				.find({ isActive: req.query.isActive })
				.populate({
					path: 'roleId',
					select: '_id name'
				})
				.exec();
		}

		return res
			.status(200)
			.json(
				success(
					`Positions fetched successfully`,
					{ recordCount: responseList.length, records: responseList },
					res.statusCode
				)
			);
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const getPositionsByRoleId = async (req, res) => {
	/*  #swagger.tags = ['Positions']
       #swagger.description = '' */
	try {
		const position = await positionModel.find({ roleId: req.params.id }).select('-roleId -code');
		if (!position) {
			return res.status(409).json(error("This position doesn't exist", res.statusCode));
		}
		return res.status(200).json(success(`Position fetched successfully`, position, res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const updatePosition = async (req, res) => {
	/*  #swagger.tags = ['Positions']
         #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                  in: 'body',
                  description: '',
                  schema: { $ref: '#/definitions/Position' }
          } */

		const existingId = await positionModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This position Id doesn't exist", res.statusCode));
		}

		const existingPosition = await positionModel.findOne({
			name: req.body.name
		});

		if (existingPosition) {
			return res
				.status(409)
				.json(error('You have already created this position name. Please try a different one', res.statusCode));
		} else {
			const updatedPosition = await positionModel.findByIdAndUpdate(
				req.params.id,
				{
					name: req.body.name,
					code: req.body.code
				},
				{ new: true }
			);
			return res.status(200).json(success(`Position updated successfully`, updatedPosition, res.statusCode));
		}
	} catch (err) {
		return res.status(409).json(error(`This role Id doesn't exist`, res.statusCode));
	}
};

const archivePosition = async (req, res) => {
	/*  #swagger.tags = ['Positions']
         #swagger.description = '' */
	try {
		const existingId = await positionModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This position Id doesn't exist", res.statusCode));
		}
		const updatedPosition = await positionModel.findByIdAndUpdate(
			req.params.id,
			{
				isActive: false
			},
			{ new: true }
		);
		return res.status(200).json(success(`Position archived successfully`, updatedPosition, res.statusCode));
	} catch (err) {
		return res.status(409).json(error(`This position Id doesn't exist`, res.statusCode));
	}
};

const unarchivePosition = async (req, res) => {
	/*  #swagger.tags = ['Positions']
         #swagger.description = '' */
	try {
		const existingId = await positionModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This position Id doesn't exist", res.statusCode));
		}

		const updatedPosition = await positionModel.findByIdAndUpdate(
			req.params.id,
			{
				isActive: true
			},
			{ new: true }
		);
		return res.status(200).json(success(`Position unarchived successfully`, updatedPosition, res.statusCode));
	} catch (err) {
		return res.status(409).json(error(`This position Id doesn't exist`, res.statusCode));
	}
};

const deleteAllPositions = async (req, res) => {
	/*  #swagger.tags = ['Positions']
         #swagger.description = '' */
	try {
		const deleteResult = await positionModel.deleteMany({});
		return res.status(200).json(success(`All Positions deleted successfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	getPositions,
	createPosition,
	getPositionsByRoleId,
	deleteAllPositions,
	updatePosition,
	archivePosition,
	unarchivePosition
};
