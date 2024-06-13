const express = require('express');
const router = express.Router();
const {inputDataSchema, bookingSchema} = require('../swagger/schemas');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/api', function (req, res) {
    res.sendStatus(418)
})
//localhost:3000/sendData
//TODO: add example data
/**
 * @swagger
 * /sendData:
 *   post:
 *     summary: send user information to find the best possible travel destination
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InputData'
 *     responses:
 *       200:
 *         description: Booking data corresponding to provided user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 */
router.post('/sendData', function (req, res, next) {
    const data = req.body

    const peopleCount = data.peopleCount
    const maxPrice = data.maxPrice
    const vacationType = data.vacationType
    const accommodationType = data.accommodationType
    const beginDate = data.beginDate
    const endDate = data.endDate
    const numberOfNights = data.numberOfNights


    //TODO: This endpoint should be used to request matching hotels for given criteria, so this endpoint
    // 1. makes API call
    // 2. filters response by given criteria
    // 3. selects the best fit
    // 4. if needed uses another API to request detailed information about this hotel
    // 5. returns to the caller

    // TODO if booking success, save into db and notify caller,
    //  if failure tell caller
    res.sendStatus(418)
})

module.exports = router;