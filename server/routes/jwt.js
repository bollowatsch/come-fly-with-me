const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'secret_key';
const router = express.Router();

//create JWT
router.post('/create-jwt', (req, res) => {
    const options = req.body.options;
    console.log(options);
    console.log(secretKey);
    const token = jwt.sign({ options }, secretKey, { expiresIn: '1h' });
    console.log(token);
    res.json({ token });
});

//verify JWT
router.post('/verify-jwt', (req, res) => {
    const token = req.body.token;
    console.log(token);
    try {
        const decoded = jwt.verify(token, secretKey);
        res.json({ options: decoded.options });
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});

module.exports = router;