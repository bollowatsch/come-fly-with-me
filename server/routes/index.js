const express = require('express');
const router = express.Router();
const bookingApi = require('../api/booking');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/sendData', function (req, res, next) {

    const peopleCount = req.body.peopleCount
    const budget = req.body.maxPrice
    const accommodationType = req.body.accommodationType
    const vacationType = req.body.vacationType
    console.log("Data received:\n" + peopleCount, budget, accommodationType, vacationType)

    res.sendStatus(418)
})

module.exports = router;