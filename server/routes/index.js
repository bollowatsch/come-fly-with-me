const express = require('express');
const router = express.Router();
const {inputDataSchema, bookingSchema} = require('../swagger/schemas');

const mapping = require('../models/mapping');
const apiHandler = require("../models/apiHandler");

/**
 * This router handles all the endpoints for communication between FE & BE.
 */

/**
 * Redirecting user to the frontend if wrong url is entered.
 */
router.get('/', function (req, res, next) {
    res.writeHead(301, {Location: `http://localhost:8080`}).end()
});

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
    // these variables hold all the data of the booking if successfully found one
    let destination = null
    let flight = null
    let accommodations = null
    let overallPrice = null

    console.time('sendData')

    const data = req.body

    const peopleCount = data.peopleCount
    const maxPrice = data.maxPrice
    const vacationType = data.vacationType              //Bach, cultural, adventure
    const accommodationType = data.accommodationType    //Hotel, Hostel, BedAndBreakfast
    const beginDate = new Date(data.beginDate)
    const endDate = new Date(data.endDate)
    const numberOfNights = data.numberOfNights

    const dayDifference = Math.round((endDate.getTime() - beginDate.getTime()) / (1000 * 3600 * 24)) - 1

    //GET DESTINATION
    destination = apiHandler.getDestination(vacationType)
    if (destination === null) res.sendStatus(500)

    //GET FLIGHT
    const departureIATA = "VIE"
    const arrivalIATA = mapping.airportData[destination].airports_iata
    const outboundDate = beginDate.toISOString().split("T")[0]
    const returnDate = endDate.toISOString().split("T")[0]

    flight = await apiHandler.getFlight(departureIATA, arrivalIATA, outboundDate, returnDate)

    //GET ACCOMMODATION
    accommodations = await apiHandler.getAccommodation(destination, outboundDate, returnDate, peopleCount)

    //GET OVERALLPRICE
    overallPrice = apiHandler.getOverallPrice(flight, accommodations)

    const booking = {
        destination: destination,
        overallPrice: overallPrice,
        flight: flight,
        accommodation: accommodations
    }

    res.send(booking)
    console.timeEnd('sendData')
})

/**
 * This function should provide the caller all booking data according to the id.
 */
router.get('/booking/:id', async function (req, res) {
    const id = req.params.id

    //Check if id is found in db.
    if (id !== undefined) {

    } else res.status(400).send("Invalid booking id!")
})

module.exports = router;