const express = require('express');
const router = express.Router();
const {inputDataSchema, bookingSchema} = require('../swagger/schemas');
const axios = require("axios");

const accommodations = require("../api/accommodation");
const booking = require("../api/booking");
const weather = require("../api/weather");
const allCities = require("../models/allCities");
const cityMapping = require("../models/cityMapping");
const accommodationsApi = require("../api/accommodation");

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
 *             example:
 *               peopleCount: 3,
 *               maxPrice: 2350
 *               vacationType: ["Adventure","City"]
 *               accommodationType: ["Hotel","Hostel","Vacation Homes"]
 *               beginDate: "2024-06-14"
 *               endDate: "2024-06-17"
 *               numberOfNights: 3
 *     responses:
 *       200:
 *         description: database ID for booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                  type: string
 *               example:
 *                 id: "507f1f77bcf86cd799439011"
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

    let destination = getRandomCityBasedOnVacationType(vacationType)

    if (destination !== null) {
        console.log(destination);
        res.status(200).send(destination)
    } else res.sendStatus(501)

    //TODO: This endpoint should be used to request matching hotels for given criteria, so this endpoint
    // 1. makes API call
    // 2. filters response by given criteria
    // 3. selects the best fit
    // 4. if needed uses another API to request detailed information about this hotel
    // 5. returns to the caller

    // TODO if booking success, save into db and notify caller,
    //  if failure tell caller
})

/**
 * @swagger
 * /booking/{bookingID}:
 *   get:
 *     summary: get booking details from database to provided ID
 *     parameters:
 *         - in: path
 *           name: bookingID
 *           required: true
 *           schema:
 *             type: string
 *             example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: database entry for provided ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 */
router.get('/booking/:id', async function (req, res) {
    const id = req.params.id
    //TODO: Call MongoDB with ID and retrieve booking information
    // 1. call mongoDB with
    // 2. construct result with provided schema from /schemas.js
    // 3. return result in body
    res.status(200).send("You called /booking/:id - This endpoint is not yet implemented");
})


/**
 * This function takes an array of vacation types and returns a random city that matches either all or any of the given vacation types.
 * It first attempts to find cities that match all types (intersection).
 * If no common cities are found, it then considers cities that match any of the types (union).
 * @param vacationType (Array): An array of vacation type keys used to determine the criteria for selecting cities.
 * @returns {String|null} A random city that matches the criteria. Returns <code>null</code> if no cities match any of the given vacation types.
 */
function getRandomCityBasedOnVacationType(vacationType) {
    let criteria = []
    vacationType.forEach(type => criteria.push(type))

    let intersection = getIntersection(criteria)

    if (intersection.length === 0) {
        let union = getUnion(criteria)

        if (union.length === 0) return null     //no match found at all.

        let randomIndex = Math.floor(Math.random() * union.length);
        return union[randomIndex];
    }
    let randomIndex = Math.floor(Math.random() * intersection.length);
    return intersection[randomIndex];
}

/**
 * This function takes an array of criteria and returns an array of cities that meet all the given criteria (intersection of the cities).
 * @param criteriaArray An array of criteria keys to find the intersection of cities.
 * @returns {any[]|*[]} An array of cities that meet all the criteria. Returns an empty array if no common cities are found or if the criteria array is empty.
 */
function getIntersection(criteriaArray) {
    //No match with ADVENTURE + CITY
    if (!Array.isArray(criteriaArray) || criteriaArray.length === 0) return []

    let commonCities = new Set(cityMapping[criteriaArray[0]])

    for (let i = 1; i < criteriaArray.length; i++) {
        const citiesSet = new Set(cityMapping[criteriaArray[i]])
        commonCities = new Set([...commonCities].filter(city => citiesSet.has(city)))
    }

    return [...commonCities]
}

/**
 * This function takes an array of criteria and returns an array of cities that meet any of the given criteria (union of the cities).
 * @param criteriaArray An array of criteria keys to find the union of cities.
 * @returns {any[]|*[]} An array of cities that meet any of the criteria. Returns an empty array if no cities match or if the criteria array is empty.
 */
function getUnion(criteriaArray) {
    if (!Array.isArray(criteriaArray) || criteriaArray.length === 0) return []

    let commonCities = new Set()

    for (let i = 0; i < criteriaArray.length; i++) {
        const citiesSet = new Set(cityMapping[criteriaArray[i]])
        commonCities = new Set([...commonCities, ...citiesSet])
    }

    return [...commonCities]
}

module.exports = router;