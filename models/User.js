const { Schema, model, Mongoose } = require('mongoose');

const UserSchema = new Schema({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	passwordHash: { type: String, required: true },
	role: { type: String, default: 'customer' },
	transactions: [
		{ type: Schema.Types.ObjectId, ref: 'Transaction', required: false },
	],
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
