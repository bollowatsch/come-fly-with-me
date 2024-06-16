const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.WEATHER_KEY;

/**
 * This function retrieves the weather data for a specified city using the Yahoo Weather API provided by RapidAPI.
 * @param city The name of the city for which the weather data is to be retrieved.
 * @returns {Promise<Object>} A promise that resolves with the weather data in JSON format if the request is successful, or rejects with an error if the request fails.
 */
module.exports.getWeather = async function getWeather(city) {
    //cannot retrieve weather data for: 'nærøyfjord', 'zugspitze'
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

/**
 * This asynchronous function retrieves the current weather data for a specified city using the WeatherAPI.com API provided by RapidAPI.
 * @param city The name of the city for which the weather data is to be retrieved.
 * @returns {Promise<Object>} A promise that resolves with the weather data in JSON format if the request is successful, or rejects with an error if the request fails.
 */
module.exports.getWeatherFaster = async function getWeatherFaster(city) {
    // cannot retrieve weather data for: 'åre', 'geiranger', 'nærøyfjord', 'zugspitze'

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: city},
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}