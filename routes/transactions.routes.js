const express = require('express');
const router = express.Router();
const passport = require('passport');
const Stripe = require('stripe');

const stripe = new Stripe(
	'sk_test_51ISkjZJFBujY6d33Vlujj5sxLnWtr8wbFMEvRODn6kaljJ9mgvjUmu7P0sKpKYm7UFAB7LxqWHPQb8xqhwBeE3A000tXzXbKLK'
);

const Transaction = require('../models/Transactions.model');

// Crud (Create): Rota para criar uma nova transação para um usuário específico
router.post('/transactions', (req, res) => {
	res.json('Hello world =]');
});

router.post('/api/charge', async (req, res) => {
	console.log(req.body);
	console.log('test');
	const { id, amount } = req.body;

	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: 'USD',
			description: 'Something',
			payment_method: id,
			confirm: true,
		});

		console.log(payment);

		return res.status(200).json({ confirm: 'abc123' });
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
