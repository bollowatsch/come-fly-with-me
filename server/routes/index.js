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
const databaseHandler = require('../databaseHandler')
const sendMail = require('../mailHandler')
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
 *               peopleCount: 3
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
    const data = req.body
    // validation is done in frontend
    const peopleCount = data.peopleCount
    const maxPrice = data.maxPrice
    const vacationType = data.vacationType
    const accommodationType = data.accommodationType
    const beginDate = new Date(data.beginDate)
    const endDate = new Date(data.endDate)
    const numberOfNights = data.numberOfNights

    const dayDifference = Math.round((endDate.getTime() - beginDate.getTime()) / (1000 * 3600 * 24)) - 1

    let destinationName = getRandomCityBasedOnVacationType(vacationType)

    //TODO: what should be done here?
    if (destinationName !== null) {
        console.log(destinationName);
        //res.status(200).send(destinationName)
    } //else res.sendStatus(501)

    //TODO: call flight API and get flightnumber
    const flightNumber = "flightNumber"

    //TODO: get cityId from booking API
    const destinationId = "testID"

    //TODO: get best fitted accommodation based on criteria
    const hotelName = "hotelName"
    const hotelId = "hotelId"
    const hotelUrl = "hotel.com"
    const totalPrice = 123.54
    //save data into DB
    try {
        const bookingId = await databaseHandler.createNewDbEntry(peopleCount,totalPrice,destinationId,destinationName,hotelId,hotelName,hotelUrl,beginDate,endDate,flightNumber)
        res.status(200).send(bookingId)
    } catch (err) {
        res.status(500).send("Error while trying to create a new booking entry in database: " + err)
    }

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
 *             example:
 *               firstName: "David"
 *               lastName: "Alaba"
 *               mailAddress: "footballgod@oefb.at"
 *               peopleCount: 3
 *               totalPrice: 3735.75
 *               destination:
 *                 destinationId: "randomIdOfVienna"
 *                 destinationName: "Vienna"
 *               hotel:
 *                 hotelId: "randomHotelId"
 *                 hotelName: "Vienna Marriott Hotel"
 *                 hotelUrl: "https://www.booking.com/hotel/at/vienna-marriott.de.html"
 *               beginDate: "2024-06-14"
 *               endDate: "2024-06-17"
 *               flightNumber: "OS477"
 */
router.get('/booking/:id', async function (req, res) {
    const id = req.params.id
    databaseHandler.getBookingDataFromDatabase(id).then(bookingData => {
        if(bookingData !== null){
            console.log("data retrieved from db: " + bookingData)
            res.status(200).send(JSON.stringify(bookingData))
        } else {
            res.status(404).send(`No booking information was found for id: ${id}`)
        }
    })
})

function getDestinationNameFromId(id) {
    //TODO: query db and return destinationName
    return "sampleCity"
}

router.patch('/updatePersonalDetails', async (req, res) => {
    const data = req.body;
    const id = data.id;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;

    if (!id || !firstName || !lastName || !email) {
        return res.status(400).json({ message: 'Invalid data, something is missing!' });
    }

    try {
        const updatedBooking = await databaseHandler.updateBookingDetails(
            id,
            { firstName, lastName, mailAddress: email },
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        sendMail(email, getDestinationNameFromId(), `http://localhost:8080/result/${id}`,)
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


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