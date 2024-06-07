const axios = require('axios');
const API_KEY = process.env.ACCOMMODATIONS_API_KEY;

/**
 * https://rapidapi.com/tipsters/api/booking-com/
 */

module.exports.get = async function getLocations(city) {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/locations',
        params: {
            name: city,
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

module.exports.searchAccommodations = async function search(dest_id) {
    const order = {
        popularity: 'popularity',
        asc: 'class_ascending',
        desc: 'class_descending',
        distance: 'distance',
        reviews: 'review_score',
        price: 'price'
    }

    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
            checkout_date: '2024-09-15',
            order_by: order.distance,
            filter_by_currency: 'EUR',
            room_number: '1',
            dest_id: dest_id,
            dest_type: 'city',
            adults_number: '2',
            checkin_date: '2024-09-14',
            locale: 'en-gb',
            //Params below are optional
            units: 'metric',
            page_number: '0'
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