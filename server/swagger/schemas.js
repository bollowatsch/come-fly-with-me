// input provided by user and sent to endpoint
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
        peopleCount: {
            type: 'integer',
        },
        totalPrice: {
            type: 'number',
        },
        city: {
            cityURL: {
                type: 'string',
            },
            cityName: {
                type: 'string',
            }
        },
        hotel: {
            hotelId:{
                type: 'string',
            },
            hotelName: {
                type: 'string',
            },
        },
        beginDate: {
            type: 'string',
        },
        endDate: {
            type: 'string',
        },
    }
}

module.exports = {inputDataSchema, bookingSchema};