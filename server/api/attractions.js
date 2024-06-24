const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.ATTRACTIONS_KEY;

//TODO: Is this even used? there is also getLocationId() in accommodation.js
module.exports.getAttractions = async function getAttractions(locationID) {
    const place = 'place:' + locationID;
    const options = {
        method: 'GET',
        url: 'https://api.geoapify.com/v2/places?categories=tourism.sights',
        params: {
            filter: place,
            lang: 'en',
            limit: '6',
            apiKey: API_KEY
        }
    }

    try {
        const response = await axios(options);
        const data = response.data;
        const extractFields = (features) => {
            return features.map(feature => {
                const properties = feature.properties;
                return {
                    name: properties.name,
                    formatted: properties.formatted,
                    image: properties.raw?.image || properties.wiki_and_media?.image || null,
                    website: properties.website,
                    opening_hours: properties.opening_hours,
                    description: properties.raw?.description || properties.description || null
                };
            });
        };

        const extractedData = extractFields(data.features);
        console.log(JSON.stringify(extractedData, null, 2));
        return Promise.resolve(JSON.stringify(extractedData, null, 2));
    } catch (error) {
        console.error(error);
    }
}

module.exports.getLocationID = async function getLocationID(city){
    const options = {
        method: 'GET',
        url: 'https://api.geoapify.com/v1/geocode/search',
        params: {
            city: city,
            format: 'json',
            apiKey: API_KEY
        }
    };
    try {
        const response = await axios(options);
        const data = response.data;

        // Extracting place_id from the first result
        const placeId = data.results && data.results.length > 0 ? data.results[0].place_id : null;
        console.log(placeId)
        return Promise.resolve(placeId);
    } catch (error) {
        console.error(error);
    }
}
