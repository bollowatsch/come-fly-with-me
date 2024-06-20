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

async function updateBookingDetails (id, updateData) {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            updateData,
        );
        return updatedBooking;
    } catch (error) {
        throw new Error('Error updating booking information:', error);
    }
}


module.exports = {getBookingDataFromDatabase, createNewDbEntry, updateBookingDetails};