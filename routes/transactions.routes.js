const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
	'sk_test_51ISkjZJFBujY6d33Vlujj5sxLnWtr8wbFMEvRODn6kaljJ9mgvjUmu7P0sKpKYm7UFAB7LxqWHPQb8xqhwBeE3A000tXzXbKLK'
);

const Transaction = require('../models/Transactions.model');

router.post('/create-checkout-session', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: req.body.products,
		mode: 'payment',
		success_url: 'http://localhost:3000/order/success/{CHECKOUT_SESSION_ID}',
		cancel_url: 'http://localhost:3000/order/canceled',
		client_reference_id: req.body.id,
	});

	res.json({ id: session.id });
});

router.post('/order/success/:id', async (req, res) => {
	const session = await stripe.checkout.sessions.retrieve(req.params.id);

	res.send(session);
});

module.exports = router;
