const express = require('express');
const router = express.Router();

const accommodationsApi = require("../api/accommodation");
const booking = require("../api/booking");
const weather = require("../api/weather");

/**
 * This router provides all endpoints for the frontend to make api calls
 */

// localhost:5000/api
router.get('/', async function (req, res) {
    res.send(await booking.get());
})

// localhost:5000/api/hotels
router.get('/hotels', async function (req, res) {
    //TODO: This endpoint should be used to request matching hotels for given criteria, so this endpoint
    // 1. makes API call
    // 2. filters response by given criteria
    // 3. selects the best fit
    // 4. if needed uses another API to request detailed information about this hotel
    // 5. returns to the caller

    let hotels = []
    await accommodationsApi.searchAccommodations().then((result) => {
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
    res.send(filteredHotels)
})

// localhost:5000/api/weather/:vienna
router.get('/weather/:city', async function (req, res) {
    const city = req.params.city

    if (city !== undefined && city !== null) {
        await weather.getWeather(city)
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).send(error))
    }
})

module.exports = router;