const { success, error } = require('../utils/responseApi');
const roleModel = require('../models/Role.model');

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
			const newRole = await roleModel.create(req.body);
			return res.status(201).json(success(`Role Created Succesfully`, newRole, res.statusCode));
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
		const responseList = await roleModel.find().exec();

		return res
			.status(200)
			.json(
				success(
					`Roles fetched succesfully`,
					{ recordCount: responseList.length, records: responseList },
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
			return res.status(200).json(success(`Role updated succesfully`, updatedRole, res.statusCode));
		}
	} catch (err) {
		return res.status(409).json(error(`This role Id doesn't exist`, res.statusCode));
	}
};

module.exports = { getRoles, createRole, updateRole };
