const { success, error } = require('../utils/responseApi');
const roleModel = require('../models/role.model');

const createRole = async (req, res) => {
	/*  #swagger.tags = ['Roles']
       #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { $ref: '#/definitions/Role' }
        } */

		let existingRole = await roleModel.findOne({ name: req.body.name });
		if (!existingRole) {
			const newRole = await roleModel.create({
				name: req.body.name,
				order: req.body.order,
				isActive: true
			});
			return res.status(201).json(success(`Role Created Successfully`, newRole, res.statusCode));
		}
		return res.status(409).json(error('This role already exists', res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

const getRoles = async (req, res) => {
	/*  #swagger.tags = ['Roles']
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
        #swagger.parameters['page'] = {
            "name": "page",
            "in": "query",
            "description": "Page number for pagination",
            "default": 1,
            "required": false,
            "type": "integer"
        }
        #swagger.parameters['limit'] = {
            "name": "limit",
            "in": "query",
            "description": "Number of records per page",
            "default": 10,
            "required": false,
            "type": "integer"
        }
        #swagger.parameters['search'] = {
            "name": "search",
            "in": "query",
            "description": "Search for roles by name",
            "default": "",
            "required": false,
            "type": "string"
        }
        #swagger.parameters['sortBy'] = {
            "name": "sortBy",
            "in": "query",
            "description": "Field to sort by",
            "default": "",
            "required": false,
            "type": "string"
        }
        #swagger.parameters['sortOrder'] = {
            "name": "sortOrder",
            "in": "query",
            "description": "Sort order (asc or desc)",
            "default": "asc",
            "required": false,
            "type": "string",
            "enum": ["asc", "desc"]
        }
        */

		let { isActive, page = 1, limit = 10, search = '', sortBy = 'name', sortOrder = 'asc' } = req.query;
		page = parseInt(page);
		limit = parseInt(limit);

		// Build query conditions
		const queryConditions = {};
		if (isActive !== undefined) {
			queryConditions.isActive = isActive;
		}
		if (search) {
			queryConditions.name = { $regex: search, $options: 'i' }; // case-insensitive search
		}

		// Sorting
		const sortCondition = {};
		sortCondition[sortBy] = sortOrder === 'asc' ? 1 : -1;

		// Get roles with pagination, search, and sorting
		const responseList = await roleModel
			.find(queryConditions)
			.sort(sortCondition)
			.skip((page - 1) * limit)
			.limit(limit)
			.exec();

		// Get total record count for pagination
		const totalRecords = await roleModel.countDocuments(queryConditions);

		return res.status(200).json(
			success(
				`Roles fetched successfully`,
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

const updateRole = async (req, res) => {
	/*  #swagger.tags = ['Roles']
       #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { $ref: '#/definitions/Role' }
        } */

		const existingId = await roleModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This role Id doesn't exist", res.statusCode));
		}

		const existingRole = await roleModel.findOne({ name: req.body.name });

		if (existingRole) {
			return res
				.status(409)
				.json(error('You have already created this role name. Please try a different one', res.statusCode));
		} else {
			const updatedRole = await roleModel.findByIdAndUpdate(
				req.params.id,
				{
					name: req.body.name,
					order: req.body.order
				},
				{ new: true }
			);
			return res.status(200).json(success(`Role updated successfully`, updatedRole, res.statusCode));
		}
	} catch (err) {
		return res.status(409).json(error(`This role Id doesn't exist`, res.statusCode));
	}
};

const archiveRole = async (req, res) => {
	/*  #swagger.tags = ['Roles']
       #swagger.description = '' */
	try {
		const existingId = await roleModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This role Id doesn't exist", res.statusCode));
		}
		const updatedRole = await roleModel.findByIdAndUpdate(
			req.params.id,
			{
				isActive: false
			},
			{ new: true }
		);
		return res.status(200).json(success(`Role archived successfully`, updatedRole, res.statusCode));
	} catch (err) {
		return res.status(409).json(error(`This role Id doesn't exist`, res.statusCode));
	}
};

const unarchiveRole = async (req, res) => {
	/*  #swagger.tags = ['Roles']
       #swagger.description = '' */
	try {
		const existingId = await roleModel.findOne({ _id: req.params.id });

		if (!existingId) {
			return res.status(409).json(error("This role Id doesn't exist", res.statusCode));
		}

		const updatedRole = await roleModel.findByIdAndUpdate(
			req.params.id,
			{
				isActive: true
			},
			{ new: true }
		);
		return res.status(200).json(success(`Role unarchived successfully`, updatedRole, res.statusCode));
	} catch (err) {
		return res.status(409).json(error(`This role Id doesn't exist`, res.statusCode));
	}
};

const deleteAllRoles = async (req, res) => {
	/*  #swagger.tags = ['Roles']
       #swagger.description = '' */
	try {
		const deleteResult = await roleModel.deleteMany({});
		return res.status(200).json(success(`All Roles deleted successfully`, deleteResult, res.statusCode));
	} catch (error) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	getRoles,
	createRole,
	updateRole,
	archiveRole,
	unarchiveRole,
	deleteAllRoles
};
