const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true,
			// validate: {
			// 	validator: function (v) {
			// 		return typeof v !== 'number';
			// 	},
			// 	message: (props) => `${props.value} Enter number!`
			// }
		}
	},
	{ timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
