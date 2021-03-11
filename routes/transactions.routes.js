const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
	'sk_test_51ISkjZJFBujY6d33Vlujj5sxLnWtr8wbFMEvRODn6kaljJ9mgvjUmu7P0sKpKYm7UFAB7LxqWHPQb8xqhwBeE3A000tXzXbKLK'
);

const Transaction = require('../models/Transactions.model');
const User = require('../models/User');

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
	const session = await stripe.checkout.sessions.listLineItems(req.params.id);

	res.send(session);
});

//(CR)UD PARA TRANAÇÕES

//   Crud (Create)
router.post('/transaction', async (req, res) => {
	try {
		const newTransaction = await Transaction.create({ ...req.body });

		// Quando criamos um post, populamos a array de taggedIn de todos os pets marcados no post com o ID do post criado
		for (let ownerId of newTransaction.ownerId) {
			const updatedUser = await User.updateOne(
				{ _id: ownerId },
				{ $push: { transactions: newTransaction._id } }
			);

			console.log(updatedUser)
		}

		return res.status(201).json(newTransaction);
	} catch (err) {
		return res.status(500).json({ msg: err });
	}
});

router.get('/transaction/:id', async (req, res) => {
	try {
		// O find() sem filtros traz todos os documentos da collection
		console.log("hey it's get");
		const transaction = await Transaction.find();

		return res.status(200).json(transaction);
	} catch (err) {
		return res.status(500).json({ msg: err });
	}
});

// cRud (Read): Rota para trazer um pet específico
router.get('/product/:id', async (req, res) => {
	try {
		// O findOne() traz a primeira ocorrência do resultado da consulta
		const product = await Product.findOne({ _id: req.params.id });
		console.log(product);

		// Se o findOne() retornar null, ou seja, não encontrar o pet no banco, retornamos um 404 dizendo que não encontramos o pet
		if (!product) {
			return res.status(404).json({ msg: 'Product not found' });
		}

		// O status 200 é um status genérico de sucesso (OK)
		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).json({ msg: err });
	}
});

module.exports = router;
