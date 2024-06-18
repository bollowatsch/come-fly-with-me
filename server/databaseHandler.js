const mongoose = require("mongoose");
const mongooseBookingSchema = require("./swagger/schemas").mongooseBookingSchema

const Booking = mongoose.model("Booking", mongooseBookingSchema)

const getBookingDataFromDatabase = async function (id) {
    try {
        const bookingInformation = await Booking.findById(id).exec();
        console.log("database handler found object:", bookingInformation);
        return bookingInformation;
    } catch (error) {
        throw new Error('Error fetching booking information:', error)
    }
}

async function createNewDbEntry(peopleCount,totalPrice,destinationId,destinationName,hotelId,hotelName,hotelUrl,beginDate,endDate,flightNumber) {
    const newBooking = new Booking({
        peopleCount,
        totalPrice,
        destination: {
            destinationId,
            destinationName
        },
        hotel:{
            hotelId,
            hotelName,
            hotelUrl
        },
        beginDate,
        endDate,
        flightNumber
    })
    await newBooking.save()
    return newBooking._id
}

module.exports = {getBookingDataFromDatabase, createNewDbEntry};