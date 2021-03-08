const express = require('express');
const router = express.Router();
const passport = require('passport');

const stripe = require('stripe')('sk_test_51ISkjZJFBujY6d33Vlujj5sxLnWtr8wbFMEvRODn6kaljJ9mgvjUmu7P0sKpKYm7UFAB7LxqWHPQb8xqhwBeE3A000tXzXbKLK')

const Transaction = require('../models/Transactions.model');

// Crud (Create): Rota para criar uma nova transação para um usuário específico
router.post('/:id/transactions', (req, res) => {
	res.json('Hello world =]');
});

module.exports = router;
