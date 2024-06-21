const axios = require('axios');
const {json} = require("express");
require('dotenv').config();

const SERPAPI_KEY = process.env.SERPAPI_KEY;

module.exports.getFlights = async function getFlights(departureIATA, arrivalIATA, outboundDate, returnDate) {
    const {getJson} = require("serpapi");

    try {
        return await getJson({
            engine: 'google_flights',
            api_key: `${SERPAPI_KEY}`,
            departure_id: `${departureIATA}`,
            arrival_id: `${arrivalIATA}`,
            outbound_date: `${outboundDate}`,
            return_date: `${returnDate}`,
        })
    } catch (error) {
        return error;
    }
}