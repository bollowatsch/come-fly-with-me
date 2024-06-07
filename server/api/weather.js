const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.WEATHER_KEY;

module.exports.getWeather = async function getWeather(city) {
    const options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: {
            location: city,
            format: 'json',
            u: 'c'
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}