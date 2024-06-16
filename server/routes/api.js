const express = require('express');
const router = express.Router();

const accommodationsApi = require("../api/accommodation");
const booking = require("../api/booking");
const weather = require("../api/weather");
const allCities = require("../models/allCities");

//const controller = require("../controller/controller");

/**
 * This router provides all api endpoints.
 */

// localhost:5000/api/hotels/vienna
router.get('/hotels/:city', async function (req, res) {
    //TODO: This endpoint should be used to request matching hotels for given criteria, so this endpoint
    // 1. makes API call
    // 2. filters response by given criteria
    // 3. selects the best fit
    // 4. if needed uses another API to request detailed information about this hotel
    // 5. returns to the caller

    const city = req.params.city
    const budget = 250

    if (city !== undefined && city !== null && allCities.includes(city)) {
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

router.get('/:city', async function (req, res) {
    const city = req.params.city
    let ids = []
    if (city !== undefined && city !== null && allCities.includes(city)) {
        await accommodationsApi.getLocationID(city).then(result => {
            result.forEach(location => {
                ids.push(location.dest_id)


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
    if (city !== undefined && city !== null && allCities.includes(city)) {
        await weather.getWeather(city)
            .then(result => res.status(200).send(result))
            .catch(error => res.sendStatus(error.response.status || 500))
    } else res.sendStatus(400)
})

// localhost:5000/api/attractions/vienna
router.get('/attractions/:city', async function (req, res) {
    //TODO: Call corresponding API to retrieve attractions in the current city.
    // filter best results.
    // return to caller.
    res.sendStatus(501)
})

module.exports = router;