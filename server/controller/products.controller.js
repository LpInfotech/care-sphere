const { success, error, validation } = require('../utils/responseApi');
const Product = require('../models/Product.model');

const createProduct = async (req, res) => {
	/*  #swagger.tags = ['Products']
       #swagger.description = '' */
	try {
		/*  #swagger.parameters['body'] = {
                in: 'body',
                description: '',
                schema: { $ref: '#/definitions/Product' }
        } */
		const { name, price } = req.body;

		const product = new Product({ name, price });

		product.save();
		return res.status(201).json(success(`Product Created Succesfully`, { products: product }, res.statusCode));
	} catch (err) {
		return res.status(500).json(error(`${err.message}`, res.statusCode));
	}
};

module.exports = {
	createProduct
};
