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

router.post('/create-checkout-session', async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'T-shirt',
						},
						unit_amount: 2000,
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: 'https://example.com/success',
			cancel_url: 'https://example.com/cancel',
		});

		res.json({ id: session.id });
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
