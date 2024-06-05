const axios = require('axios');
const keys = require('../apiKeys.env')
const API_KEY = process.env.API_KEY ? process.env.API_KEY : keys.BOOKING_KEY;

module.exports.get = async function getAccommodation() {
    const options = {
        method: 'GET',
        url: 'https://booking-com.p.rapidapi.com/v1/hotels/search',
        params: {
            checkout_date: '2024-09-15',
            order_by: 'popularity',
            filter_by_currency: 'AED',
            include_adjacency: 'true',
            categories_filter_ids: 'class::2,class::4,free_cancellation::1',
            room_number: '1',
            dest_id: '-553173',
            dest_type: 'city',
            adults_number: '2',
            page_number: '0',
            checkin_date: '2024-09-14',
            locale: 'en-gb',
            units: 'metric'
        },
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'booking-com.p.rapidapi.com'
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

// module.exports.getAccommodation = getAccommodation();