function filterBestFlight(flightData){
    let status = flightData.search_metadata.status

    if (status === 'Success' && flightData.error === undefined){
        let bestFit = null

        const bestFlights = flightData.best_flights
        if (bestFlights !== undefined) bestFit = findBestFlight(bestFlights)

        const otherFlights = flightData.other_flights
        if ((bestFit === null || bestFit === undefined) && otherFlights !== undefined) bestFit = findBestFlight(otherFlights)

        return bestFit
    } else throw new Error("no flight was found")
}

/**
 * Finds the cheapest flight from an array based on price. Returns details of the
 * cheapest flight, including price, airline, flight number, departure and arrival
 * information, duration, carbon emissions in kg, and whether it is a direct flight.
 *
 * @param {Object[]} flights - Array of flight objects to evaluate.
 * @returns {Object} - Details of the cheapest flight.
 */
function findCheapestFlight(flights) {
    let cheapestFlight = null

    for (let flight of flights) {
        if (!cheapestFlight || flight.price < cheapestFlight.price) cheapestFlight = flight
    }

    return {
        price: cheapestFlight.price,
        airline: cheapestFlight.flights[0].airline,
        flightNumber: cheapestFlight.flights[0].flight_number,
        departure: {
            airport: cheapestFlight.flights[0].departure_airport.name,
            time: cheapestFlight.flights[0].departure_airport.time
        },
        arrival: {
            airport: cheapestFlight.flights[0].arrival_airport.name,
            time: cheapestFlight.flights[0].arrival_airport.time
        },
        duration: cheapestFlight.total_duration,
        carbonEmissions: cheapestFlight.carbon_emissions.this_flight / 1000,
        directFlight: cheapestFlight.flights.length === 1
    }
}

/**
 * Finds the best flight from an array based on criteria such as price, duration,
 * carbon emissions, and absence of delays. Returns details of the best flight,
 * including price, airline, flight number, departure and arrival information,
 * duration, carbon emissions in kg, and whether it is a direct flight.
 *
 * @param {Object[]} flights - Array of flight objects to evaluate.
 * @returns {Object} - Details of the best flight matching the criteria.
 */
function findBestFlight(flights) {
    const bestFlight = flights.reduce((bestFlight, currentFlight) => {
        if (
            currentFlight.total_duration < bestFlight.total_duration &&
            currentFlight.price < bestFlight.price &&
            currentFlight.carbon_emissions.difference_percent < bestFlight.carbon_emissions.difference_percent &&
            !currentFlight.flights.some(flight => flight.often_delayed_by_over_30_min)
        ) return currentFlight
        return bestFlight
    }, flights[0])

    // Assuming `flights` is an array of objects with at least one flight
    const firstLeg = bestFlight.flights[0]
    const lastLeg = bestFlight.flights[bestFlight.flights.length - 1]

    return {
        price: bestFlight.price,
        airline: firstLeg.airline,
        flightNumber: firstLeg.flight_number,
        departure: {
            airport: firstLeg.departure_airport.name,
            time: firstLeg.departure_airport.time
        },
        arrival: {
            airport: lastLeg.arrival_airport.name,
            time: lastLeg.arrival_airport.time
        },
        duration: bestFlight.total_duration,
        carbonEmissions: bestFlight.carbon_emissions.this_flight / 1000, // Converting to kg
        directFlight: bestFlight.flights.length === 1
    }
}

/**
 * Filters and sorts hotels to find the best hotel based on combined price and distance scores.
 * @param {Object} accommodations - Object containing hotel data.
 * @returns {Array} - Sorted array of hotels, with the best hotel first.
 */
function filterBestHotel(accommodations) {
    const mappedHotels = mapHotels(accommodations.result)
    const normalizedHotels = normalizeValues(mappedHotels)
    const scoredHotels = calculateScores(normalizedHotels)
    return sortHotels(scoredHotels)
}
function mapHotels(hotels) {
    return hotels.map(hotel => ({
        hotel_id: hotel.hotel_id,
        price: hotel.min_total_price,
        checkin_from: hotel.checkin.from,
        checkout_until: hotel.checkout.until,
        distance_to_cc: hotel.distance_to_cc,
        timezone: hotel.timezone,
        hotelName: hotel.hotel_name,
        currency_code: hotel.currencycode,
        accommodation_type: hotel.accommodation_type_name,
        full_address: `${hotel.address}, ${hotel.city}, ${hotel.zip}, ${hotel.country_trans}`,
        picture: hotel.main_photo_url,
        url: hotel.url
    }))
}
function normalizeValues(hotels) {
    const minPrice = Math.min(...hotels.map(hotel => hotel.price))
    const maxPrice = Math.max(...hotels.map(hotel => hotel.price))
    const minDistance = Math.min(...hotels.map(hotel => hotel.distance_to_cc))
    const maxDistance = Math.max(...hotels.map(hotel => hotel.distance_to_cc))

    return hotels.map(hotel => ({
        ...hotel,
        normalizedPrice: (hotel.price - minPrice) / (maxPrice - minPrice),
        normalizedDistance: (hotel.distance_to_cc - minDistance) / (maxDistance - minDistance)
    }))
}
function calculateScores(hotels) {
    const priceWeight = 0.6 // Adjust weight as needed
    const distanceWeight = 0.4 // Adjust weight as needed

    return hotels.map(hotel => ({
        ...hotel,
        score: priceWeight * (1 - hotel.normalizedPrice) + // Lower price is better
            distanceWeight * (1 - hotel.normalizedDistance) // Closer distance is better
    }))
}
function sortHotels(hotels) {
    return hotels.sort((a, b) => b.score - a.score)
}

/**
 * Filters hotels to find the hotel with the lowest price.
 * @param {Object} accommodations - Object containing hotel data.
 * @returns {Object} - Hotel object representing the cheapest hotel.
 */
function filterCheapestHotel(accommodations) {
    const mappedHotels = mapHotels(accommodations.result)
    return findCheapestHotel(mappedHotels) // Return only the cheapest hotel
}
function findCheapestHotel(hotels) {
    return hotels.reduce((cheapest, hotel) => {
        return hotel.price < cheapest.price ? hotel : cheapest
    }, hotels[0])
}

module.exports.getBestFlight = filterBestFlight
module.exports.getBestHotel = filterBestHotel
module.exports.getCheapestHotel = filterCheapestHotel