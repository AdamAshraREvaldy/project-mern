const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
    jwtExpiration: '24h',
    jwtSecret: 'jwtSecret',
    gmail: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS
}