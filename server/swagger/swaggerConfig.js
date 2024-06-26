const swaggerJsdoc = require('swagger-jsdoc');
const {bookingSchema, inputDataSchema} = require("./schemas");
const port = process.env.PORT || 5000;


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Come Fly with me API',
            version: '1.0.0',
            description: 'A simple CRUD API to manage booking data',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {
            schemas: {
                InputData: inputDataSchema,
                Booking: bookingSchema,
            },
        },
    },
    apis: ['./routes/*.js'], // Path to your API route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
