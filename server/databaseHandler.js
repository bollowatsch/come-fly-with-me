const mongoose = require("mongoose");
const mongooseBookingSchema = require("./swagger/schemas").mongooseBookingSchema

const Booking = mongoose.model("Booking", mongooseBookingSchema)

async function getBookingDataFromDatabase (id) {
    try {
        const bookingInformation = await Booking.findById(id).exec();
        console.log("database handler found object:", bookingInformation);
        return bookingInformation;
    } catch (error) {
        throw new Error('Error fetching booking information:', error)
    }
}

async function createNewDbEntry(peopleCount, maxPrice, vacationType, accommodationType, totalPrice, destinationId, destinationName, hotelId, hotelName, hotelUrl, hotelPicture, beginDate, endDate, flightNumber) {
    //const mongooseBookingSchema = require("../swagger/schemas").mongooseBookingSchema
    //const Booking = mongoose.model("Booking", mongooseBookingSchema)

    const newBooking = new Booking({
        peopleCount,
        maxPrice,
        vacationType,
        accommodationType,
        totalPrice,
        destination: {destinationId, destinationName},
        hotel: {hotelId, hotelName, hotelUrl, hotelPicture},
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
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedBooking;
    } catch (error) {
        throw new Error(error);
    }
}

async function replaceBookingDetails(bookingID, peopleCount, maxPrice, vacationType, accommodationType, totalPrice, destinationId, destinationName, hotelId, hotelName, hotelUrl, hotelPicture, beginDate, endDate, flightNumber) {
    try {
        const replacement = {
            peopleCount,
            maxPrice,
            vacationType,
            accommodationType,
            totalPrice,
            destination: {destinationId, destinationName},
            hotel: {hotelId, hotelName, hotelUrl, hotelPicture},
            beginDate,
            endDate,
            flightNumber
        }

        return  await Booking.findOneAndReplace({_id: bookingID},
            replacement,{new:true,runValidators: true}
        );
    }catch (error){
        throw new Error(error);

    }
}

async function deleteBooking(bookingID){
    try{
        const res = await Booking.findByIdAndDelete(bookingID);
        return res;
    } catch(error) {
        throw new Error(error);
    }
}


module.exports = {getBookingDataFromDatabase, createNewDbEntry, updateBookingDetails, deleteBooking, replaceBookingDetails};