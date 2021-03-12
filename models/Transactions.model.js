const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
	value: { type: Number, required: true },
	products: [
		{
			item: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
			quantity: { type: Number, required: true },
		},
	],
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Buyer',
		required: true,
	},
	checkoutId: {
		type: String,
		required: true,
	},
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports = TransactionModel;
