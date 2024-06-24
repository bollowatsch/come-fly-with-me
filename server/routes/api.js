const express = require('express');
const router = express.Router();

const accommodationsApi = require("../api/accommodation");
const flights = require("../api/flights");
const booking = require("../api/booking");
const weather = require("../api/weather");
const mapping = require("../models/mapping");
const timers = require("node:timers");
const attractions = require("../api/attractions");

//const controller = require("../controller/controller");

/**
 * This router provides all api endpoints.
 */

router.get('/hotels/:city', async function (req, res) {
    //TODO: This endpoint should be used to request matching hotels for given criteria, so this endpoint
    // 1. makes API call
    // 2. filters response by given criteria
    // 3. selects the best fit
    // 4. if needed uses another API to request detailed information about this hotel
    // 5. returns to the caller

    const city = req.params.city
    const budget = 250

    if (city !== undefined && city !== null && mapping.allCities.includes(city)) {
        let dest_id = '-1995499';
        await accommodationsApi.getLocationID(city)
            .then(hotels => dest_id = hotels[0].dest_id)
            .then(async () => {
                let hotels = []
                await accommodationsApi.searchAccommodations(dest_id)
                    .then((result) => {
                        result.result.forEach(hotel => hotels.push(hotel))
                    })

                const filteredHotels = hotels.map(hotel => {
                    return {
                        picture: hotel.main_photo_url,
                        hotel_id: hotel.hotel_id,
                        accommodation_type: hotel.accommodation_type,
                        distance_to_cc: hotel.distance_to_cc,
                        timezone: hotel.timezone,
                        hotelName: hotel.hotel_name,
                        price: hotel.min_total_price,
                        full_address: `${hotel.address}, ${hotel.city}, ${hotel.zip}, ${hotel.country_trans}`
                    }
                })

                const fit = filteredHotels.filter((hotel) => {
                    return hotel.price <= budget
                })
                res.send({city: city, budget: budget, result: fit})
            })
            .catch(error => res.sendStatus(error.response.status || 5000))
    } else res.sendStatus(400)
})

router.get('/hot/:adults', async function (req, res) {
    const adults = req.params.adults

    if (adults !== undefined && adults !== null) {
        await accommodationsApi.test(adults)
            .then(result => {
                const mapped = result.result.map(hotel => {
                    return {
                        hotel_id: hotel.hotel_id,
                        price: hotel.min_total_price,
                        checkin_from: hotel.checkin.from,
                        checkout_until: hotel.checkout.until,
                        distance_to_cc: hotel.distance_to_cc,
                        timezone: hotel.timezone,
                        hotelName: hotel.hotel_name,
                        currency_code: hotel.currencycode,
                        accommodation_type: hotel.accommodation_type_name,
                        full_address: `${hotel.address}, ${hotel.city}, ${hotel.zip}, ${hotel.country_trans}`,
                        picture: hotel.main_photo_url,
                        url: hotel.url
                    }
                })

                res.send(mapped)
            })
    }
})

router.get('/dest/:city', async function (req, res) {
    const city = req.params.city

    if (city !== undefined && city !== null && mapping.allCities.includes(city)) {
        await accommodationsApi.getLocationID(city).then(result => {

            let ids = []

            result.forEach(hotel => {
                ids.push(hotel.dest_id)
            })

            res.status(200).send(ids[0])
        })
    }

    //~1sec für dest_id
    //~2-3 sec für
})

//localhost:5000/api/h/vienna
//Only use for testing.
router.get('/h/:city', async function (req, res) {
    const city = req.params.city
    let ids = []
    if (city !== undefined && city !== null && mapping.allCities.includes(city)) {
        await accommodationsApi.getLocationID(city).then(result => {
            result.forEach(location => {
                ids.push(location.dest_id)
                // A city may have multiple destination id's.

            })
            res.status(200).send(ids)
        }).catch(error => res.sendStatus(error.response.status || 500))
    } else res.sendStatus(400)
})

/**
 * This endpoint is used to request weather data for a certain city.
 * Checks if city is valid and part of the mapped cities.
 * http://localhost:5000/api/weather/vienna
 * @returns status 200 and weather data if successful, else error code and message.
 */
router.get('/weather/:city', async function (req, res) {
    const city = req.params.city

    // Only make request if city was found in mappedCities.
    if (city !== undefined && city !== null && mapping.allCities.includes(city)) {
        await weather.getWeatherFaster(city)
            .then(result => res.status(200).send(result))
            .catch(error => res.sendStatus(error.response.status || 500))
    } else res.sendStatus(400)
})

router.get('/flights', async function (req, res) {
    const departure = "VIE"
    const arrival = "AMS"
    const outboundDate = "2024-06-24"
    const returnDate = "2024-06-30"

    await flights.getFlights(departure, arrival, outboundDate, returnDate)
        .then(result => res.status(200).send(result))
        .catch(error => res.sendStatus(500))
})

// localhost:5000/api/attractions/vienna
router.get('/attractions/:city', async function (req, res) {
    const city = req.params.city;
    let locationID = '';
    console.log(city)
    if (city !== undefined && city !== null && mapping.allCities.includes(city)) {
        try {
            locationID = await attractions.getLocationID(city)
            console.log(locationID)
        } catch(error) {
            console.error('Error retrieving location ID:', error);
            res.status(500).json({ error: 'An error occurred while retrieving the location ID.' });
        }

        if (locationID){
            await attractions.getAttractions(locationID)
                .then(result => res.status(200).send(result))
                .catch(error => res.sendStatus(500))
        }
    }
})

module.exports = router;