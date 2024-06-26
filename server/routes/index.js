const express = require('express');
const router = express.Router();
const {inputDataSchema, bookingSchema} = require('../swagger/schemas');

const apiHandler = require("../models/apiHandler");
const databaseHandler = require("../databaseHandler");
const mailHandler = require('../mailHandler')

const mapping = require('../models/mapping');
const mongoose = require('mongoose')
const moment = require('moment');
const axios = require("axios");
const pictureMapping = require('../models/pictureMapping');
const {log} = require("debug");

/**
 * This router handles all the endpoints for communication between FE & BE.
 */

/**
 * Redirecting user to the frontend if wrong url is entered.
 */
router.get('/', function (req, res) {
    res.writeHead(301, {Location: `http://localhost:8080`}).end()
});

//localhost:3000/sendData
async function createNewTrip(departureLocation, peopleCount, maxPrice, vacationType, accommodationType, beginDate, endDate) {
    //GET DESTINATION
    const destination = apiHandler.getDestination(vacationType)
    if (destination === null) res.sendStatus(500)

    //GET FLIGHT
    const departureIATA = mapping.airportData[departureLocation.toLowerCase()].airports_iata
    const arrivalIATA = mapping.airportData[destination].airports_iata
    const outboundDate = beginDate.toISOString().split("T")[0]
    const returnDate = endDate.toISOString().split("T")[0]

    const flight = await apiHandler.getFlight(departureIATA, arrivalIATA, outboundDate, returnDate)

    //GET ACCOMMODATION
    let hotel
    const accommodations = await apiHandler.getAccommodation(destination, outboundDate, returnDate, peopleCount).then(result => hotel = result.bestFit).catch(() => res.sendStatus(500))

    let destinationID
    await axios.get(`http://localhost:5000/api/dest/${destination}`).then(res => destinationID = res.data)

    //GET OVERALL PRICE
    const overallPrice = apiHandler.getOverallPrice(flight, accommodations)

    return {destination, destinationID, hotel, overallPrice, flight}
}

async function generateTrip(data) {
    const departureLocation = data.departureAirport
    const peopleCount = data.peopleCount
    const maxPrice = data.maxPrice
    const vacationType = data.vacationType              //Bach, cultural, adventure
    const accommodationType = data.accommodationType    //Hotel, Hostel, BedAndBreakfast
    const beginDate = new Date(data.beginDate)
    const endDate = new Date(data.endDate)

    //GET DESTINATION
    const destination = await apiHandler.getDestination(vacationType)
        .catch(error => {return Promise.reject(error)})

    //GET FLIGHT
    const departureIATA = mapping.airportData[departureLocation.toLowerCase()].airports_iata
    const arrivalIATA = mapping.airportData[destination].airports_iata
    const outboundDate = beginDate.toISOString().split("T")[0]
    const returnDate = endDate.toISOString().split("T")[0]

    const flight = await apiHandler.getFlight(departureIATA, arrivalIATA, outboundDate, returnDate)
        .catch(error => {return Promise.reject(error)})

    //GET ACCOMMODATION
    let hotel
    let destinationID
    let  accommodations
    await apiHandler.getAccommodation(destination, outboundDate, returnDate, peopleCount)
        .then(result => {
            hotel = result.bestFit
            destinationID = result.destinationID
            accommodations = result
        })
        .catch(error => {return Promise.reject(error)})

    //GET OVERALL PRICE
    const overallPrice = apiHandler.getOverallPrice(flight, accommodations)

    //save data into DB
    try {
        await databaseHandler.createNewDbEntry(peopleCount, maxPrice, vacationType, accommodationType, overallPrice, destinationID, destination, hotel.hotelId, hotel.hotelName, hotel.url, hotel.picture, beginDate, endDate, flight.flightNumber)
            .then(bookingID => Promise.resolve(bookingID))
            .catch(() => {return Promise.reject(null)})
    } catch (err) {
        return Promise.reject(null)
    }
}

async function retryGeneratingTrip(data, maxRetries) {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            return await generateTrip(data)
        } catch (error) {
            if (i === maxRetries) throw error
        }
    }
}

//localhost:3000/sendData
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
 *               accommodationType: "Hotel"
 *               beginDate: "2024-07-14"
 *               endDate: "2024-07-17"
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
router.post('/sendData', async function (req, res) {
    const data = req.body

    await retryGeneratingTrip(data, 3)
        .then(id => res.status(200).send({id: id}))
        .catch(error => res.sendStatus(500))
})

//localhost:3000/updatePersonalDetails
/**
 * @swagger
 * /updatePersonalDetails:
 *   patch:
 *     summary: Update personal details of the booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/patchDataSchema'
 *     responses:
 *       200:
 *         description: Personal details updated successfully
 *       400:
 *         description: Invalid booking ID or data
 *       500:
 *         description: Internal server error
 */
router.patch('/updatePersonalDetails', async function (req, res) {
    const data = req.body;
    const bookingID = data.bookingID;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const mailAddress = data.mailAddress;

    try {
        const updateData = {
            firstName, lastName, mailAddress
        };
        const updatedBooking = await databaseHandler.updateBookingDetails(bookingID, updateData);

        if (updatedBooking) {
            const bookingData = await databaseHandler.getBookingDataFromDatabase(bookingID);

            if (bookingData) {
                const beginDate = bookingData.beginDate;
                const endDate = bookingData.endDate;
                mailHandler.sendConfirmationMail(mailAddress, beginDate, endDate, bookingID);
            }
            res.status(200).send({
                message: 'Details updated successfully',
                firstName: updatedBooking.firstName,
                lastName: updatedBooking.lastName,
                mailAddress: updatedBooking.mailAddress
            });
        } else {
            res.status(400).send({message: 'Invalid booking ID'});
        }
    } catch (error) {
        res.status(500).send({message: 'Internal server error', error: error.message});
    }
});

//localhost:3000/deleteBooking
/**
 * @swagger
 * /deleteBooking:
 *   delete:
 *     summary: Delete a booking by ID
 *     parameters:
 *       - in: query
 *         name: bookingID
 *         schema:
 *           type: string
 *         required: true  // Indicates that the bookingID parameter is mandatory
 *         description: The ID of the booking to delete
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       400:
 *         description: Invalid booking ID
 *       500:
 *         description: Server error
 */
router.delete('/deleteBooking', async (req, res) => {
    const bookingID = req.query.bookingID;

    if (!bookingID) {
        return res.status(400).send('Booking ID is required!');
    }

    try {
        const deletedBooking = await databaseHandler.deleteBooking(bookingID);
        if (deletedBooking) {
            res.status(200).send("Booking deleted successfully");
        } else {
            res.status(400).send("Invalid booking ID");
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
});

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
    const oneWeekFromNow = moment().add(2, 'weeks');

    databaseHandler.getBookingDataFromDatabase(id).then(bookingData => {
        if (bookingData !== null) {
            const picture = pictureMapping.pictureData[bookingData.destination.destinationName].picture;
            console.log(picture);

            const beginDateStr = bookingData.beginDate;
            const beginDate = beginDateStr.split(' ')[1] + ' ' + beginDateStr.split(' ')[2] + ' ' + beginDateStr.split(' ')[3];
            console.log(oneWeekFromNow)
            if (moment(beginDate).isAfter(oneWeekFromNow)) {
                res.status(403).send(`Data not available yet for booking id: ${id}`);
            } else {
                bookingData.hotel.hotelPicture = picture;
                console.log(bookingData)
                res.status(200).send(JSON.stringify(bookingData));
            }
        } else {
            res.status(404).send(`No booking information was found for id: ${id}`)
        }
    })
})

router.put('/booking/:id', async function (req, res) {
    const bookingID = req.params.id

    const data = req.body
    const departureLocation = data.departureAirport
    const peopleCount = data.peopleCount
    const maxPrice = data.maxPrice
    const vacationType = data.vacationType              //Bach, cultural, adventure
    const accommodationType = data.accommodationType    //Hotel, Hostel, BedAndBreakfast
    const beginDate = new Date(data.beginDate)
    const endDate = new Date(data.endDate)

    const trip = await createNewTrip(departureLocation, peopleCount, maxPrice, vacationType, accommodationType, beginDate, endDate)

    //save data into DB
    try {
        const replacementBooking = await databaseHandler.replaceBookingDetails(bookingID, peopleCount, maxPrice, vacationType, accommodationType, trip.totalPrice, trip.destinationId, trip.destination, trip.hotel.hotelId, trip.hotel.hotelName, trip.hotel.url, trip.hotel.picture, beginDate, endDate, trip.flight.flightNumber)
        res.status(200).send({id: replacementBooking._id});
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;