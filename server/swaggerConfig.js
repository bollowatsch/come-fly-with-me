const swaggerJsdoc = require('swagger-jsdoc');
const app = require('./app');
const port = 3000//app.address().port;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: `http://localhost:{port}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your API route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
