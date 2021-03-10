const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('stripe')(
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

router.post('/create-checkout-session', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: req.body,
		mode: 'payment',
		success_url: 'https://example.com/success',
		cancel_url: 'https://example.com/cancel',
	});

	res.json({ id: session.id });
});

module.exports = router;
