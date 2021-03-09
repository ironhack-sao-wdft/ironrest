const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
	value: { type: Number, required: true },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' },
	adress: { type: String, required: true },
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports = TransactionModel