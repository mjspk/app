module.exports = {
    SERVER_URL: process.env.SERVER_URL || 'localhost',
    BASE_PATH: process.env.BASE_PATH || '/v1',
    API_PORT: process.env.API_PORT || 5000,
    HTTP_PROTOCOL: process.env.HTTP_PROTOCOL || 'http://',
    NODE_ENV: process.env.NODE_ENV || 'development',
}