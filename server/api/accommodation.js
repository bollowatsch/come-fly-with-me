const axios = require('axios');
const keys = require('../apiKeys')
require("dotenv").config();
const API_KEY = process.env.API_KEY ? process.env.API_KEY : keys.ACCOMMODATIONS_KEY;

module.exports.searchAccommodations = async function search () {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
            checkout_date: '2024-09-15',
            order_by: 'popularity',
            filter_by_currency: 'AED',
            room_number: '1',
            dest_id: '-553173',
            dest_type: 'city',
            adults_number: '2',
            checkin_date: '2024-09-14',
            locale: 'en-gb',
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
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("error");
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
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}