// input provided by user and sent to endpoint
const mongoose = require("mongoose");
const inputDataSchema = {
    type: 'object',
    properties: {
        peopleCount: {
            type: 'integer',
        },
        maxPrice: {
            type: 'integer',
        },
        vacationType: {
            type: 'array',
            items: {
                type: 'string',
            }
        },
        accommodationType: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        beginDate: {
            type: 'string',
        },
        endDate: {
            type: 'string',
        },
        numberOfNights: {
            type: 'integer',
        }
    }
}

//data sent back from booking database
const bookingSchema = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        mailAddress: {
            type: 'string',
        },
        peopleCount: {
            type: 'integer',
        },
        totalPrice: {
            type: 'number',
        },
        destination: {
            type: 'object',
            properties: {
                destinationId: {
                    type: 'string',
                },
                destinationName: {
                    type: 'string',
                }
            }
        },
        hotel: {
            type: 'object',
            properties: {
                hotelId: {
                    type: 'string',
                },
                hotelName: {
                    type: 'string',
                },
                hotelUrl: {
                    type: 'string',
                }
            }
        },
        beginDate: {
            type: 'string',
        },
        endDate: {
            type: 'string',
        },
        flightNumber: {
            type: 'string',
        }
    }
}

const patchDataSchema = {
    type: 'object',
    properties: {
        bookingID: {
            type: 'string',
        },
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        mailAddress: {
            type: 'string',
        },
    }
}

const mongooseBookingSchema = new mongoose.Schema({
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        mailAddress: {
            type: String,
        },
        peopleCount: {
            type: Number,
        },
        totalPrice: {
            type: Number,
        },
        destination: {
            destinationId: {
                type: String,
            },
            destinationName: {
                type: String,
            }
        },
        hotel: {
            hotelId:{
                type: String,
            },
            hotelName: {
                type: String,
            },
            hotelUrl:{
                type: String,
            }
        },
        beginDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        flightNumber: {
            type: String,
        }
})

module.exports = {inputDataSchema, bookingSchema, mongooseBookingSchema, patchDataSchema};