const { success, error } = require('../utils/responseApi');
const divisionModel = require('../models/division.model');

const createDivision = async (req, res) => {
	/*  #swagger.tags = ['Divisions']
       #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { $ref: '#/definitions/Division' }
        } */
		let existingDivision = await divisionModel.findOne({ name: req.body.name, coordinatorId: req.body.coordinatorId });
		if (!existingDivision) {
			const newDivision = await divisionModel.create({
				name: req.body.name,
				coordinatorId: req.body.coordinatorId,
				code: req.body.code,
				isActive: req.body.isActive
			});
			return res.status(201).json(success(`Division Created Successfully`, newDivision, res.statusCode));
		}
		return res.status(409).json(error('This Division already exists to this coordinator', res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const getDivisions = async (req, res) => {
	/*  #swagger.tags = ['Divisions']
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
		/*
			#swagger.parameters['search'] = {
				"name": "search",
				"in": "query",
				"description": "Search term to filter divisions",
				"required": false,
				"type": "string"
			}
			#swagger.parameters['page'] = {
				"name": "page",
				"in": "query",
				"description": "Page number for pagination",
				"required": false,
				"type": "integer",
				"default": 1
			}
			#swagger.parameters['limit'] = {
				"name": "limit",
				"in": "query",
				"description": "Number of records per page",
				"required": false,
				"type": "integer",
				"default": 10
			}
			#swagger.parameters['sortBy'] = {
				"name": "sortBy",
				"in": "query",
				"description": "Field to sort by",
				"required": false,
				"type": "string",
				"default": ""
			}
			#swagger.parameters['sortOrder'] = {
				"name": "sortOrder",
				"in": "query",
				"description": "Sort order (asc or desc)",
				"required": false,
				"type": "string",
				"enum": ["asc", "desc"],
				"default": "asc"
			} */

		let { isActive, search, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
		page = parseInt(page, 10);
		limit = parseInt(limit, 10);

		// Normalize sortBy to lowercase to ensure it works with any case
		sortBy = sortBy.toLowerCase();

		// Building the filter query
		let filter = {};
		if (isActive !== undefined) {
			filter.isActive = isActive;
		}

		// Building the sort object
		let sort = {};
		sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

		// Fetching the data with pagination and sorting
		const responseList = await divisionModel
			.find(filter)
			.populate({
				path: 'coordinatorId',
				select: 'fullName' // Specify the fields you want to populate
			})
			.sort(sort)
			.skip((page - 1) * limit)
			.limit(limit)
			.exec();

		// Use let to allow reassignment
		let modifiedResponseList = responseList.map((division) => {
			const { coordinatorId } = division.toObject();
			return {
				...division.toObject(),
				coordinatorName: coordinatorId?.fullName || null // Add coordinatorName as a separate key
			};
		});

		// Additional filter for coordinatorName
		if (search) {
			modifiedResponseList = modifiedResponseList.filter((division) => {
				return (
					(division.coordinatorName && division.coordinatorName.toLowerCase().includes(search.toLowerCase())) ||
					(division.name && division.name.toLowerCase().includes(search.toLowerCase())) ||
					(division.code && division.code.toLowerCase().includes(search.toLowerCase()))
				);
			});
		}

		// Sort by coordinatorName if the sortBy parameter is set to 'coordinatorName'
		if (sortBy === 'coordinatorname') {
			modifiedResponseList.sort((a, b) => {
				const nameA = a.coordinatorName ? a.coordinatorName.toLowerCase() : '';
				const nameB = b.coordinatorName ? b.coordinatorName.toLowerCase() : '';
				if (sortOrder === 'asc') {
					return nameA.localeCompare(nameB);
				} else {
					return nameB.localeCompare(nameA);
				}
			});
		}

		// Getting the total count for pagination purposes
		const totalRecords = modifiedResponseList.length;

		return res.status(200).json(
			success(
				`Divisions fetched successfully`,
				{
					recordCount: modifiedResponseList.length,
					totalRecords,
					totalPages: Math.ceil(totalRecords / limit),
					currentPage: page,
					records: modifiedResponseList
				},
				res.statusCode
			)
		);
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const updateDivision = async (req, res) => {
	/*  #swagger.tags = ['Divisions']
       #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { $ref: '#/definitions/Division' }
        } */

		const existingId = await divisionModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This Division Id doesn't exist", res.statusCode));
		}

		const existingDivision = await divisionModel.findOne({
			name: req.body.name,
			coordinatorId: req.body.coordinatorId
		});

		if (existingDivision) {
			return res.status(409).json(error('This Division already exists to this coordinator', res.statusCode));
		} else {
			const updatedDivision = await divisionModel.findByIdAndUpdate(
				req.params.id,
				{
					name: req.body.name,
					coordinatorId: req.body.coordinatorId,
					code: req.body.code
				},
				{ new: true }
			);
			return res.status(200).json(success(`Division updated successfully`, updatedDivision, res.statusCode));
		}
	} catch (err) {
		return res.status(409).json(error(`${err.message}`, res.statusCode));
	}
};

const archiveDivision = async (req, res) => {
	/*  #swagger.tags = ['Divisions']
       #swagger.description = '' */
	try {
		const existingId = await divisionModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This Division Id doesn't exist", res.statusCode));
		}
		const updatedDivision = await divisionModel.findByIdAndUpdate(
			req.params.id,
			{
				isActive: true
			},
			{ new: true }
		);
		return res.status(200).json(success(`Division archived successfully`, updatedDivision, res.statusCode));
	} catch (err) {
		return res.status(409).json(error(`${err.message}`, res.statusCode));
	}
};

const unarchiveDivision = async (req, res) => {
	/*  #swagger.tags = ['Divisions']
       #swagger.description = '' */
	try {
		const existingId = await divisionModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This Division Id doesn't exist", res.statusCode));
		}
		const updatedDivision = await divisionModel.findByIdAndUpdate(
			req.params.id,
			{
				isActive: false
			},
			{ new: true }
		);
		return res.status(200).json(success(`Division unarchived successfully`, updatedDivision, res.statusCode));
	} catch (err) {
		return res.status(409).json(error(`${err.message}`, res.statusCode));
	}
};

const deleteAllDivisions = async (req, res) => {
	/*  #swagger.tags = ['Divisions']
       #swagger.description = '' */
	try {
		const deleteResult = await divisionModel.deleteMany({});
		return res.status(200).json(success(`All Divisions deleted successfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	createDivision,
	getDivisions,
	updateDivision,
	archiveDivision,
	unarchiveDivision,
	deleteAllDivisions
};
