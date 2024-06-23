//const flights = require('../api/flights');
const accommodations = require('../api/accommodation');

const mapping = require('./mapping');
const dataProcessor = require('./dataProcessor')
const {getFlights} = require("../api/flights");

function getDestination(vacationType) {
    const destination = getRandomCityBasedOnVacationType(vacationType)
    if (destination !== null) return destination
}

async function getFlight(departureIATA, arrivalIATA, outboundDate, returnDate) {
    try {
        const flightData = await getFlights(departureIATA, arrivalIATA, outboundDate, returnDate)
        console.log("flightData:")
        console.table(flightData)
        if (flightData !== undefined) return dataProcessor.getBestFlight(flightData)
    } catch (error) {
        console.error(error)
        return null
    }
}

async function getAccommodation(destination, checkInDate, checkOutDate, numberOfTravelers) {
    try {
        //TODO: Update selection of dest_id. hotel array may contain multiple dest_id's for a city. the first in the array is always the most expensive one.
        let dest_id
        await accommodations.getLocationID(destination).then(hotels => dest_id = hotels[0].dest_id)
        const numberOfRooms = calculateRooms(numberOfTravelers)
        const accommodationsData = await accommodations.searchAccommodations(dest_id, checkInDate, checkOutDate, numberOfTravelers, numberOfRooms)

        if (accommodationsData !== undefined) {
            const bestFits = dataProcessor.getBestHotel(accommodationsData)
            const cheapestFits = dataProcessor.getCheapestHotel(accommodationsData)

            if (bestFits[0].hotel_id === bestFits[0].hotel_id) {
                return {
                    bestFit: bestFits[0]
                }
            }

            return {
                bestFit: bestFits[0],
                cheapestFit: cheapestFits
            }
        }

        return null
    } catch (error) {
        console.error(error)
        return null
    }
}

function calculateOverallPrice(flightData, accommodationsData) {
    if (flightData !== null && accommodationsData !== null) {
        const flightPrice = flightData.price !== undefined ? flightData.price : null
        const accommodationsBestFitPrice = accommodationsData.bestFit.price !== undefined ? accommodationsData.bestFit.price : 0
        const accommodationsCheapestFitPrice = accommodationsData.cheapestFit !== undefined && accommodationsData.cheapestFit.price !== undefined ? accommodationsData.cheapestFit.price : 0
        return flightPrice + accommodationsBestFitPrice + accommodationsCheapestFitPrice
    } else return null
}

/**
 * Calculates the minimum number of hotel rooms needed for a given number of travelers.
 * Assumes room capacities of 2, 3, and 4 people per room.
 * @param {number} travelers - The total number of travelers.
 * @returns {number} - The minimum number of rooms needed.
 */
function calculateRooms(travelers) {
    const capacities = [2, 3, 4];
    let roomsNeeded = capacities.map(capacity => Math.ceil(travelers / capacity));
    return Math.min(...roomsNeeded);
}

/**
 * This function takes an array of vacation types and returns a random city that matches either all or any of the given vacation types.
 * It first attempts to find cities that match all types (intersection).
 * If no common cities are found, it then considers cities that match any of the types (union).
 * @param vacationType (Array): An array of vacation type keys used to determine the criteria for selecting cities.
 * @returns {String|null} A random city that matches the criteria. Returns <code>null</code> if no cities match any of the given vacation types.
 */
function getRandomCityBasedOnVacationType(vacationType) {
    let criteria = []
    vacationType.forEach(type => criteria.push(type))

    let intersection = getIntersection(criteria)

    if (intersection.length === 0) {
        let union = getUnion(criteria)
        if (union.length === 0) return null     //no match found at all.

        let randomIndex = Math.floor(Math.random() * union.length);
        return union[randomIndex];
    }
    let randomIndex = Math.floor(Math.random() * intersection.length);
    return intersection[randomIndex];
}

/**
 * This function takes an array of criteria and returns an array of cities that meet all the given criteria (intersection of the cities).
 * @param criteriaArray An array of criteria keys to find the intersection of cities.
 * @returns {any[]|*[]} An array of cities that meet all the criteria. Returns an empty array if no common cities are found or if the criteria array is empty.
 */
function getIntersection(criteriaArray) {
    //No match with ADVENTURE + CITY
    if (!Array.isArray(criteriaArray) || criteriaArray.length === 0) return []

    let commonCities = new Set(mapping.cityMapping[criteriaArray[0]])

    for (let i = 1; i < criteriaArray.length; i++) {
        const citiesSet = new Set(mapping.cityMapping[criteriaArray[i]])
        commonCities = new Set([...commonCities].filter(city => citiesSet.has(city)))
    }

    return [...commonCities]
}

/**
 * This function takes an array of criteria and returns an array of cities that meet any of the given criteria (union of the cities).
 * @param criteriaArray An array of criteria keys to find the union of cities.
 * @returns {any[]|*[]} An array of cities that meet any of the criteria. Returns an empty array if no cities match or if the criteria array is empty.
 */
function getUnion(criteriaArray) {
    if (!Array.isArray(criteriaArray) || criteriaArray.length === 0) return []

    let commonCities = new Set()

    for (let i = 0; i < criteriaArray.length; i++) {
        const citiesSet = new Set(mapping.cityMapping[criteriaArray[i].toUpperCase()])
        commonCities = new Set([...commonCities, ...citiesSet])
    }

    return [...commonCities]
}

module.exports.getDestination = getDestination
module.exports.getFlight = getFlight
module.exports.getAccommodation = getAccommodation
module.exports.getOverallPrice = calculateOverallPrice