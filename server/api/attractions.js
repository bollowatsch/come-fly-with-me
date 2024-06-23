const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ATTRACTIONS_KEY;

//TODO: Is this even used? there is also getLocationId() in accommodation.js
module.exports.getLocationID = async function getLocationID(city) {
    const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation',
        params: {
            query: city,
            languagecode: 'en-us'
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

module.exports.getAttractions = async function getAttractions(locationID){
    const axios = require('axios');

    const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions',
        params: {
            id: locationID,
            sortBy: 'trending',
            page: '1',
            currency_code: 'EUR',
            languagecode: 'en-us'
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
