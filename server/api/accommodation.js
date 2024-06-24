const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ACCOMMODATIONS_KEY;

/**
 * https://rapidapi.com/tipsters/api/booking-com/
 */

module.exports.getLocationID = async function getLocations(city) {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
        params: {
            name: city,
            locale: 'en-gb'
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'booking-com.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options);
        return Promise.resolve(response.data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

module.exports.searchAccommodations = async function search(dest_id, checkInDate, checkOutDate, numberOfTravelers, rooms) {
    const order = {
        popularity: 'popularity',
        asc: 'class_ascending',
        desc: 'class_descending',
        distance: 'distance',
        reviews: 'review_score',
        price: 'price'
    }

    const destinationType = {
        city: "city",
        region: "region",
        landmark: "landmark",
        district: "district",
        hotel: "hotel",
        country: "country",
        airport: "airport"
    }

    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
            checkin_date: checkInDate,
            checkout_date: checkOutDate,
            order_by: order.price,
            adults_number: numberOfTravelers,
            room_number: rooms,
            dest_id: dest_id,
            dest_type: destinationType.city,
            filter_by_currency: 'EUR',
            locale: 'en-gb',
            //Params below are optional
            units: 'metric'
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error);
    }
}

module.exports.test = async function (adults) {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
            checkin_date: '2024-09-15',
            checkout_date: '2024-09-27',
            order_by: 'price',
            adults_number: adults,
            room_number: '1',
            dest_id: '-1995499',
            dest_type: 'city',
            filter_by_currency: 'EUR',
            locale: 'en-gb',
            //Params below are optional
            units: 'metric'
        },
        headers: {
            'X-RapidAPI-Key': 'cd1b47b54fmsh7aeea4b245f13bfp1c422fjsnfcccee70a4f7',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log(error.message)
        return Promise.reject(error);
    }
}

module.exports.getSpecificAccommodationData = async function getData(id) {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
        params: {
            hotel_id: id,
            locale: 'en-gb'
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return Promise.resolve(response.data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}