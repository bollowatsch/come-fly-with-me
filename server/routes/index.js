const express = require('express');
const router = express.Router();
const {inputDataSchema, bookingSchema} = require('../swagger/schemas');
const axios = require("axios");

const accommodations = require("../api/accommodation");
const booking = require("../api/booking");
const weather = require("../api/weather");
const allCities = require("../models/allCities");
const cityMapping = require("../models/cityMapping");

/**
 * This router handles all the endpoints for communication between FE & BE.
 */

/**
 * Redirecting user to the frontend if wrong url is entered.
 */
router.get('/', function (req, res, next) {
    res.writeHead(301, {Location: `http://localhost:8080`}).end()
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
router.post('/sendData', async function (req, res, next) {
    //TODO: input validation?
    // vacationType could be null
    // accommodationType could be null
    // numberOfNights could be null
    const data = req.body

    const peopleCount = data.peopleCount
    const maxPrice = data.maxPrice
    const vacationType = data.vacationType
    const accommodationType = data.accommodationType
    const beginDate = new Date(data.beginDate)
    const endDate = new Date(data.endDate)
    const numberOfNights = data.numberOfNights

    const dayDifference = Math.round((endDate.getTime() - beginDate.getTime()) / (1000 * 3600 * 24)) - 1

    const getCityByCriteria = (criteriaArray) => {
        if (!Array.isArray(criteriaArray) || criteriaArray.length === 0) return [];

        // Start with the cities in the first criteria
        let commonCities = new Set(cityMapping[criteriaArray[0]]);

        // Intersect with the cities in the subsequent criteria
        for (let i = 1; i < criteriaArray.length; i++) {
            const citiesSet = new Set(cityMapping[criteriaArray[i]]);
            commonCities = new Set([...commonCities].filter(city => citiesSet.has(city)));
        }

        return [...commonCities];
    };

    let criteria = []
    vacationType.forEach(type => criteria.push(type));

    //No match with ADVENTURE + CITY
    const selectedCities = getCityByCriteria(criteria)
    const randomIndex = Math.floor(Math.random() * selectedCities.length);
    const destination = selectedCities[randomIndex];

    console.log(destination);

    if (destination !== undefined) {
        /*
        await accommodations.getLocationID(destination)
            .then(locationID => {
                accommodations.searchAccommodations(locationID)
                    .then(result => console.log(result))
            })
            .catch(error => res.sendStatus(error.response.status || 500))
         */

        /*
        await weather.getWeather(destination)
            .then(result => {
                console.log(result.current_observation.condition.temperature)
                res.status(200).send(result)
            })
            .catch(error => res.sendStatus(error.response.status || 500))
         */
    } else res.sendStatus(418)

    //TODO: This endpoint should be used to request matching hotels for given criteria, so this endpoint
    // 1. makes API call
    // 2. filters response by given criteria
    // 3. selects the best fit
    // 4. if needed uses another API to request detailed information about this hotel
    // 5. returns to the caller

    // TODO if booking success, save into db and notify caller,
    //  if failure tell caller
})

module.exports = router;