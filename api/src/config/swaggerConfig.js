
const { HTTP_PROTOCOL, SERVER_URL, API_PORT } = require('./serverConfig');

const options = {
    swaggerOptions: {
        explorer: true,
        url: `${HTTP_PROTOCOL}${SERVER_URL}:${API_PORT}/swagger.json`,
    },
    apis: ['./src/routes/*.js']

};

module.exports = options;