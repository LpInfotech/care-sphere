const { success, error } = require('../utils/responseApi');
const positionModel = require('../models/position.model');
const roleModel = require('../models/role.model');

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

		/*  #swagger.parameters['page'] = {
                "name": "page",
                "in": "query",
                "description": "Page number for pagination",
                "required": false,
                "type": "integer",
                "default": 1
        } */

		/*  #swagger.parameters['limit'] = {
                "name": "limit",
                "in": "query",
                "description": "Number of records per page",
                "required": false,
                "type": "integer",
                "default": 10
        } */

		/*  #swagger.parameters['search'] = {
                "name": "search",
                "in": "query",
                "description": "Global search term to filter positions by name or code",
                "required": false,
                "type": "string",
        } */

		/*  #swagger.parameters['sortOrder'] = {
                "name": "sortOrder",
                "in": "query",
                "description": "sortOrder by desc or asc",
                "required": false,
                "type": "string",
        } */

		/*  #swagger.parameters['sortBy'] = {
                "name": "sortBy",
                "in": "query",
                "description": "sortBy by field name ,code etc",
                "required": false,
                "type": "string",
        } */

		const { isActive, search, limit = 10, page = 1, sortBy = 'name', sortOrder = 'asc' } = req.query;

		// Define the query object
		let query = {};
		if (isActive !== undefined) {
			query.isActive = isActive === 'true';
		}

		// Prepare roleId search
		let roleIds = [];
		if (search) {
			const regex = new RegExp(search, 'i'); // 'i' for case-insensitive search

			// First, search for matching roles
			const roles = await roleModel.find({ name: regex }).select('_id').exec();
			roleIds = roles.map((role) => role._id);

			// Check if search is numeric for code field
			const isNumericSearch = !isNaN(search) && !isNaN(parseFloat(search));
			query = {
				...query,
				$or: [
					{ name: regex },
					...(isNumericSearch ? [{ code: parseFloat(search) }] : []),
					...(roleIds.length > 0 ? [{ roleId: { $in: roleIds } }] : [])
				]
			};
		}

		// Pagination
		const pagination = {
			limit: parseInt(limit),
			skip: (page - 1) * limit
		};

		// Sort by roleId.name or other fields
		const sortOptions = {};
		if (sortBy === 'roleId.name') {
			sortOptions['roleId.name'] = sortOrder === 'asc' ? 1 : -1;
		} else {
			sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
		}

		// Aggregation to allow sorting by populated field `roleId.name`
		const responseList = await positionModel.aggregate([
			{ $match: query },
			{
				$lookup: {
					from: 'roles', // The collection name of the Role model
					localField: 'roleId',
					foreignField: '_id',
					as: 'roleId'
				}
			},
			{ $unwind: '$roleId' }, // Unwind the array to a single object
			{
				$sort: sortOptions // Sorting based on fields, including roleId.name
			},
			{
				$project: {
					_id: 1,
					name: 1,
					code: 1,
					isActive: 1,
					roleId: { _id: 1, name: 1 } // Project only _id and name of roleId
				}
			},
			{ $skip: pagination.skip },
			{ $limit: pagination.limit }
		]);

		// Get the total number of records matching the query
		const totalRecords = await positionModel.countDocuments(query);

		return res.status(200).json(
			success(
				`Positions fetched successfully`,
				{
					recordCount: responseList.length,
					totalRecords,
					currentPage: page,
					totalPages: Math.ceil(totalRecords / limit),
					records: responseList
				},
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
