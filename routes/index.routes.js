const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.json('Hello world =]');
})

module.exports = router;