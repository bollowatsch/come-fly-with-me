const express = require('express');
const router = express.Router();
const {inputDataSchema, bookingSchema} = require('../swagger/schemas');

const mapping = require('../models/mapping');
const apiHandler = require("../models/apiHandler");
const {updateBookingDetails, getBookingDataFromDatabase} = require("../databaseHandler");
const {deleteBooking} = require('../databaseHandler');
const mongoose = require('mongoose')
const sendMail = require('../mailHandler')
const moment = require('moment');
const {getLocationID} = require("../api/accommodation");
const axios = require("axios");

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
router.post('/sendData', async function (req, res, next) {
    // these variables hold all the data of the booking if successfully found one
    let destination = null
    let flight = null
    let accommodations = null
    let overallPrice = null

    console.time('sendData')

    const data = req.body

    const departureLocation = data.departureAirport
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
    console.log("destination: " + destination)
    if (destination === null) res.sendStatus(500)

    //GET FLIGHT
    const departureIATA = mapping.airportData[departureLocation.toLowerCase()].airports_iata//"VIE"
    const arrivalIATA = mapping.airportData[destination].airports_iata
    const outboundDate = beginDate.toISOString().split("T")[0]
    const returnDate = endDate.toISOString().split("T")[0]

    flight = await apiHandler.getFlight(departureIATA, arrivalIATA, outboundDate, returnDate)

    //GET ACCOMMODATION
    accommodations = await apiHandler.getAccommodation(destination, outboundDate, returnDate, peopleCount)
    ///const hotel = accommodations.bestFit
    let destinationId
    await axios.get(`http://localhost:5000/api/dest/${destination}`).then(res => destinationId = res.data)

    //GET OVERALL PRICE
    overallPrice = apiHandler.getOverallPrice(flight, accommodations)

    //save data into DB
    try {
        const bookingId = await createNewDbEntry(peopleCount, maxPrice, vacationType,accommodationType,overallPrice, destinationId, destination, hotel.hotelId, hotel.hotelName, hotel.url , hotel.picture ,beginDate, endDate, flight.flightNumber)
        res.status(200).send({ id: bookingId });
    } catch (err) {
        console.log(err)
    }
    console.timeEnd('sendData')
})

async function createNewDbEntry(peopleCount, maxPrice, vacationType, accommodationType, totalPrice, destinationId, destinationName, hotelId, hotelName, hotelUrl , hotelPicture ,beginDate, endDate, flightNumber) {
    const mongooseBookingSchema = require("../swagger/schemas").mongooseBookingSchema
    const Booking = mongoose.model("Booking", mongooseBookingSchema)

    const newBooking = new Booking({
        peopleCount, maxPrice, vacationType, accommodationType, totalPrice, destination:{destinationId, destinationName}, hotel:{hotelId, hotelName, hotelUrl, hotelPicture}, beginDate, endDate, flightNumber
    })
    await newBooking.save()
    return newBooking._id
}


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
            firstName,
            lastName,
            mailAddress
        };
        const updatedBooking = await updateBookingDetails(bookingID, updateData);

        if (updatedBooking) {
            //TODO: implement sendMail, so that is provided with correct destination Name from the id and the URL of the hotel
            sendMail(updatedBooking.mailAddress, 'destination Name', 'URL of hotel')
            res.status(200).send({
                message: 'Details updated successfully',
                firstName: updatedBooking.firstName,
                lastName: updatedBooking.lastName,
                mailAddress: updatedBooking.mailAddress
            });
        } else {
            res.status(400).send({ message: 'Invalid booking ID' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error.message });
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
    console.log(bookingID);

    if (!bookingID) {
        return res.status(400).send('Booking ID is required!');
    }

    try {
        const deletedBooking = await deleteBooking(bookingID);
        if (deletedBooking) {
            res.status(200).send( "Booking deleted successfully");
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
    const oneWeekFromNow = moment().add(1, 'week');
    getBookingDataFromDatabase(id).then(bookingData => {
        if(bookingData !== null){
            console.log("data retrieved from db: " + bookingData)
            const beginDateStr = bookingData.beginDate;
            const beginDate = beginDateStr.split(' ')[1] + ' ' + beginDateStr.split(' ')[2] + ' ' + beginDateStr.split(' ')[3];
            console.log(oneWeekFromNow)
            if (moment(beginDate).isAfter(oneWeekFromNow)) {
                res.status(403).send(`Data not available yet for booking id: ${id}`);
            } else {
                res.status(200).send(JSON.stringify(bookingData));
            }
        } else {
            res.status(404).send(`No booking information was found for id: ${id}`)
        }
    })
})

module.exports = router;