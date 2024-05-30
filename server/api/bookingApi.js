const axios = require('axios');

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
            'x-rapidapi-key': 'a2dfdbca2emshf1e8cb092072415p1662bbjsn1ee3824b80a2',
            'x-rapidapi-host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// module.exports.getAccommodation = getAccommodation();